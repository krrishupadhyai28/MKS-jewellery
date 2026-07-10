--
-- PostgreSQL database dump
--

\restrict XhUKQ8bXPFjUSc5WQbQr6PDsxhiiOOaPqbSFipxbOQeh3d8OvrjS2rgCgR48Jgg

-- Dumped from database version 18.4 (709c4c3)
-- Dumped by pg_dump version 18.4

-- Started on 2026-07-10 18:05:34

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 898 (class 1247 OID 24577)
-- Name: user_role; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.user_role AS ENUM (
    'ADMIN',
    'CUSTOMER'
);


ALTER TYPE public.user_role OWNER TO neondb_owner;

--
-- TOC entry 264 (class 1255 OID 49750)
-- Name: calculate_cart_item_subtotal(); Type: FUNCTION; Schema: public; Owner: neondb_owner
--

CREATE FUNCTION public.calculate_cart_item_subtotal() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

    NEW.subtotal = NEW.quantity * NEW.price_at_time;

    RETURN NEW;

END;
$$;


ALTER FUNCTION public.calculate_cart_item_subtotal() OWNER TO neondb_owner;

--
-- TOC entry 265 (class 1255 OID 49752)
-- Name: calculate_discounted_price(); Type: FUNCTION; Schema: public; Owner: neondb_owner
--

CREATE FUNCTION public.calculate_discounted_price() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

    IF NEW.discount_percent IS NOT NULL THEN

        NEW.discounted_price =
        NEW.price - (NEW.price * NEW.discount_percent / 100);

    ELSE

        NEW.discounted_price = NEW.price;

    END IF;

    RETURN NEW;

END;
$$;


ALTER FUNCTION public.calculate_discounted_price() OWNER TO neondb_owner;

--
-- TOC entry 262 (class 1255 OID 49746)
-- Name: log_inventory_change(); Type: FUNCTION; Schema: public; Owner: neondb_owner
--

CREATE FUNCTION public.log_inventory_change() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

    IF OLD.quantity <> NEW.quantity THEN

        INSERT INTO inventory_logs
        (
            product_id,
            old_stock,
            new_stock,
            change_reason,
            created_at
        )
        VALUES
        (
            NEW.id,
            OLD.quantity,
            NEW.quantity,
            'Stock updated',
            CURRENT_TIMESTAMP
        );

    END IF;

    RETURN NEW;

END;
$$;


ALTER FUNCTION public.log_inventory_change() OWNER TO neondb_owner;

--
-- TOC entry 263 (class 1255 OID 49748)
-- Name: log_order_status_change(); Type: FUNCTION; Schema: public; Owner: neondb_owner
--

CREATE FUNCTION public.log_order_status_change() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

    IF OLD.status IS DISTINCT FROM NEW.status THEN

        INSERT INTO order_status_history
        (
            order_id,
            status,
            remarks,
            updated_at
        )
        VALUES
        (
            NEW.order_id,
            NEW.status,
            'Order status updated',
            CURRENT_TIMESTAMP
        );

    END IF;

    RETURN NEW;

END;
$$;


ALTER FUNCTION public.log_order_status_change() OWNER TO neondb_owner;

--
-- TOC entry 261 (class 1255 OID 49743)
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: neondb_owner
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_updated_at_column() OWNER TO neondb_owner;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 224 (class 1259 OID 49229)
-- Name: coupons; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.coupons (
    coupon_id uuid DEFAULT gen_random_uuid() NOT NULL,
    code character varying(50) NOT NULL,
    discount_type character varying(20) NOT NULL,
    discount_value numeric(10,2) NOT NULL,
    min_order_amount numeric(10,2) DEFAULT 0,
    max_discount numeric(10,2),
    expiry_date timestamp without time zone,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT coupons_code_not_empty CHECK ((length(TRIM(BOTH FROM code)) > 0)),
    CONSTRAINT coupons_discount_type_check CHECK (((discount_type)::text = ANY ((ARRAY['percentage'::character varying, 'fixed'::character varying])::text[]))),
    CONSTRAINT coupons_discount_value_positive CHECK ((discount_value >= (0)::numeric)),
    CONSTRAINT coupons_max_discount_positive CHECK (((max_discount IS NULL) OR (max_discount >= (0)::numeric))),
    CONSTRAINT coupons_min_order_amount_positive CHECK ((min_order_amount >= (0)::numeric))
);


ALTER TABLE public.coupons OWNER TO neondb_owner;

--
-- TOC entry 259 (class 1259 OID 49733)
-- Name: active_coupons; Type: VIEW; Schema: public; Owner: neondb_owner
--

CREATE VIEW public.active_coupons AS
 SELECT coupon_id,
    code,
    discount_type,
    discount_value,
    min_order_amount,
    max_discount,
    expiry_date
   FROM public.coupons
  WHERE ((is_active = true) AND ((expiry_date IS NULL) OR (expiry_date > CURRENT_TIMESTAMP)));


ALTER VIEW public.active_coupons OWNER TO neondb_owner;

--
-- TOC entry 238 (class 1259 OID 49362)
-- Name: addresses; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.addresses (
    address_id integer NOT NULL,
    user_id integer,
    full_name character varying(100) NOT NULL,
    phone character varying(15) NOT NULL,
    address_line1 character varying(200) NOT NULL,
    address_line2 character varying(200),
    city character varying(100) NOT NULL,
    state character varying(100) NOT NULL,
    pincode character varying(10) NOT NULL,
    country character varying(100) DEFAULT 'India'::character varying NOT NULL,
    is_default boolean DEFAULT false,
    CONSTRAINT addresses_phone_not_empty CHECK ((length(TRIM(BOTH FROM phone)) > 0)),
    CONSTRAINT addresses_pincode_check CHECK (((pincode)::text ~ '^[0-9]{6}$'::text))
);


ALTER TABLE public.addresses OWNER TO neondb_owner;

--
-- TOC entry 237 (class 1259 OID 49361)
-- Name: addresses_address_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.addresses_address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.addresses_address_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3783 (class 0 OID 0)
-- Dependencies: 237
-- Name: addresses_address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.addresses_address_id_seq OWNED BY public.addresses.address_id;


--
-- TOC entry 250 (class 1259 OID 49521)
-- Name: cart; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.cart (
    id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.cart OWNER TO neondb_owner;

--
-- TOC entry 249 (class 1259 OID 49520)
-- Name: cart_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cart_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3784 (class 0 OID 0)
-- Dependencies: 249
-- Name: cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.cart_id_seq OWNED BY public.cart.id;


--
-- TOC entry 252 (class 1259 OID 49533)
-- Name: cart_items; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.cart_items (
    id integer NOT NULL,
    cart_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    price_at_time numeric(10,2) NOT NULL,
    subtotal numeric(10,2),
    CONSTRAINT cart_items_price_positive CHECK ((price_at_time >= (0)::numeric)),
    CONSTRAINT cart_items_quantity_check CHECK ((quantity > 0)),
    CONSTRAINT cart_items_quantity_positive CHECK ((quantity > 0)),
    CONSTRAINT cart_items_subtotal_positive CHECK ((subtotal >= (0)::numeric))
);


ALTER TABLE public.cart_items OWNER TO neondb_owner;

--
-- TOC entry 251 (class 1259 OID 49532)
-- Name: cart_items_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.cart_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cart_items_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3785 (class 0 OID 0)
-- Dependencies: 251
-- Name: cart_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;


--
-- TOC entry 223 (class 1259 OID 41082)
-- Name: categories; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.categories (
    category_id integer CONSTRAINT categories_id_not_null NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    image_url text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT categories_name_not_empty CHECK ((length(TRIM(BOTH FROM name)) > 0))
);


ALTER TABLE public.categories OWNER TO neondb_owner;

--
-- TOC entry 228 (class 1259 OID 49315)
-- Name: order_items; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.order_items (
    order_item_id integer NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    price_at_purchase numeric(10,2) NOT NULL,
    CONSTRAINT order_items_price_positive CHECK ((price_at_purchase >= (0)::numeric)),
    CONSTRAINT order_items_quantity_check CHECK ((quantity > 0)),
    CONSTRAINT order_items_quantity_positive CHECK ((quantity > 0))
);


ALTER TABLE public.order_items OWNER TO neondb_owner;

--
-- TOC entry 226 (class 1259 OID 49303)
-- Name: orders; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.orders (
    order_id integer NOT NULL,
    user_id integer NOT NULL,
    address_id integer NOT NULL,
    total_amount numeric(10,2) NOT NULL,
    status character varying(30) DEFAULT 'pending'::character varying,
    payment_status character varying(30) DEFAULT 'pending'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT orders_payment_status_check CHECK (((payment_status)::text = ANY ((ARRAY['pending'::character varying, 'completed'::character varying, 'failed'::character varying, 'refunded'::character varying])::text[]))),
    CONSTRAINT orders_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'confirmed'::character varying, 'shipped'::character varying, 'delivered'::character varying, 'cancelled'::character varying])::text[]))),
    CONSTRAINT orders_total_amount_positive CHECK ((total_amount >= (0)::numeric))
);


ALTER TABLE public.orders OWNER TO neondb_owner;

--
-- TOC entry 222 (class 1259 OID 41046)
-- Name: products; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.products (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    discounted_price numeric(10,2),
    discount_percent integer DEFAULT 0,
    quantity integer DEFAULT 0 NOT NULL,
    brand character varying(100),
    color character varying(50),
    image_url text,
    category character varying(100),
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT products_discount_percent_check CHECK (((discount_percent >= 0) AND (discount_percent <= 100))),
    CONSTRAINT products_discounted_price_positive CHECK (((discounted_price IS NULL) OR (discounted_price >= (0)::numeric))),
    CONSTRAINT products_price_positive CHECK ((price >= (0)::numeric)),
    CONSTRAINT products_quantity_positive CHECK ((quantity >= 0)),
    CONSTRAINT products_title_not_empty CHECK ((length(TRIM(BOTH FROM title)) > 0))
);


ALTER TABLE public.products OWNER TO neondb_owner;

--
-- TOC entry 256 (class 1259 OID 49718)
-- Name: customer_order_history; Type: VIEW; Schema: public; Owner: neondb_owner
--

CREATE VIEW public.customer_order_history AS
 SELECT o.order_id,
    o.user_id,
    o.total_amount,
    o.status,
    o.payment_status,
    oi.product_id,
    p.title AS product_name,
    oi.quantity,
    oi.price_at_purchase,
    o.created_at
   FROM ((public.orders o
     JOIN public.order_items oi ON ((o.order_id = oi.order_id)))
     JOIN public.products p ON ((oi.product_id = p.id)));


ALTER VIEW public.customer_order_history OWNER TO neondb_owner;

--
-- TOC entry 260 (class 1259 OID 49737)
-- Name: customer_summary; Type: VIEW; Schema: public; Owner: neondb_owner
--

CREATE VIEW public.customer_summary AS
SELECT
    NULL::integer AS user_id,
    NULL::character varying(255) AS full_name,
    NULL::character varying(255) AS email,
    NULL::timestamp with time zone AS created_at,
    NULL::bigint AS total_orders,
    NULL::numeric AS total_spent;


ALTER VIEW public.customer_summary OWNER TO neondb_owner;

--
-- TOC entry 244 (class 1259 OID 49454)
-- Name: inventory_logs; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.inventory_logs (
    log_id integer NOT NULL,
    product_id integer NOT NULL,
    old_stock integer,
    new_stock integer,
    change_reason character varying(200),
    changed_by integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT inventory_new_stock_positive CHECK (((new_stock IS NULL) OR (new_stock >= 0))),
    CONSTRAINT inventory_old_stock_positive CHECK (((old_stock IS NULL) OR (old_stock >= 0))),
    CONSTRAINT inventory_reason_not_empty CHECK (((change_reason IS NULL) OR (length(TRIM(BOTH FROM change_reason)) > 0))),
    CONSTRAINT inventory_stock_change_check CHECK (((old_stock IS NULL) OR (new_stock IS NULL) OR (old_stock <> new_stock)))
);


ALTER TABLE public.inventory_logs OWNER TO neondb_owner;

--
-- TOC entry 243 (class 1259 OID 49453)
-- Name: inventory_logs_log_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.inventory_logs_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inventory_logs_log_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3786 (class 0 OID 0)
-- Dependencies: 243
-- Name: inventory_logs_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.inventory_logs_log_id_seq OWNED BY public.inventory_logs.log_id;


--
-- TOC entry 258 (class 1259 OID 49728)
-- Name: inventory_status; Type: VIEW; Schema: public; Owner: neondb_owner
--

CREATE VIEW public.inventory_status AS
 SELECT p.id AS product_id,
    p.title,
    p.quantity AS current_stock,
    count(il.log_id) AS total_changes,
    max(il.created_at) AS last_updated
   FROM (public.products p
     LEFT JOIN public.inventory_logs il ON ((p.id = il.product_id)))
  GROUP BY p.id, p.title, p.quantity;


ALTER VIEW public.inventory_status OWNER TO neondb_owner;

--
-- TOC entry 254 (class 1259 OID 49708)
-- Name: low_stock_products; Type: VIEW; Schema: public; Owner: neondb_owner
--

CREATE VIEW public.low_stock_products AS
 SELECT p.id AS product_id,
    p.title,
    p.brand,
    p.quantity,
    c.name AS category_name
   FROM (public.products p
     LEFT JOIN public.categories c ON (((p.category)::integer = c.category_id)))
  WHERE (p.quantity < 5);


ALTER VIEW public.low_stock_products OWNER TO neondb_owner;

--
-- TOC entry 248 (class 1259 OID 49477)
-- Name: notifications; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.notifications (
    notification_id integer NOT NULL,
    user_id integer NOT NULL,
    title character varying(200) NOT NULL,
    message text NOT NULL,
    is_read boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT notifications_message_not_empty CHECK ((length(TRIM(BOTH FROM message)) > 0)),
    CONSTRAINT notifications_title_not_empty CHECK ((length(TRIM(BOTH FROM title)) > 0))
);


ALTER TABLE public.notifications OWNER TO neondb_owner;

--
-- TOC entry 247 (class 1259 OID 49476)
-- Name: notifications_notification_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.notifications_notification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notifications_notification_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3787 (class 0 OID 0)
-- Dependencies: 247
-- Name: notifications_notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.notifications_notification_id_seq OWNED BY public.notifications.notification_id;


--
-- TOC entry 227 (class 1259 OID 49314)
-- Name: order_items_order_item_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.order_items_order_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_items_order_item_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3788 (class 0 OID 0)
-- Dependencies: 227
-- Name: order_items_order_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.order_items_order_item_id_seq OWNED BY public.order_items.order_item_id;


--
-- TOC entry 246 (class 1259 OID 49464)
-- Name: order_status_history; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.order_status_history (
    history_id integer NOT NULL,
    order_id integer NOT NULL,
    status character varying(30) NOT NULL,
    remarks text,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT order_status_history_remarks_not_empty CHECK (((remarks IS NULL) OR (length(TRIM(BOTH FROM remarks)) > 0))),
    CONSTRAINT order_status_history_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'confirmed'::character varying, 'shipped'::character varying, 'delivered'::character varying, 'cancelled'::character varying])::text[])))
);


ALTER TABLE public.order_status_history OWNER TO neondb_owner;

--
-- TOC entry 245 (class 1259 OID 49463)
-- Name: order_status_history_history_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.order_status_history_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_status_history_history_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3789 (class 0 OID 0)
-- Dependencies: 245
-- Name: order_status_history_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.order_status_history_history_id_seq OWNED BY public.order_status_history.history_id;


--
-- TOC entry 220 (class 1259 OID 41029)
-- Name: users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    full_name character varying(255) NOT NULL,
    role character varying(50) DEFAULT 'CUSTOMER'::character varying,
    profile_image text,
    is_verified boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['customer'::character varying, 'admin'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO neondb_owner;

--
-- TOC entry 255 (class 1259 OID 49713)
-- Name: order_summary; Type: VIEW; Schema: public; Owner: neondb_owner
--

CREATE VIEW public.order_summary AS
 SELECT o.order_id,
    u.full_name AS customer_name,
    u.email,
    o.total_amount,
    o.status,
    o.payment_status,
    a.city,
    a.state,
    o.created_at
   FROM ((public.orders o
     JOIN public.users u ON ((o.user_id = u.id)))
     LEFT JOIN public.addresses a ON ((o.address_id = a.address_id)));


ALTER VIEW public.order_summary OWNER TO neondb_owner;

--
-- TOC entry 225 (class 1259 OID 49302)
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.orders_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_order_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3790 (class 0 OID 0)
-- Dependencies: 225
-- Name: orders_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders.order_id;


--
-- TOC entry 230 (class 1259 OID 49324)
-- Name: payments; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.payments (
    payment_id integer NOT NULL,
    order_id integer NOT NULL,
    payment_method character varying(50) NOT NULL,
    payment_status character varying(30) NOT NULL,
    transaction_id character varying(100),
    amount numeric(10,2) NOT NULL,
    paid_at timestamp without time zone,
    CONSTRAINT payments_amount_positive CHECK ((amount >= (0)::numeric)),
    CONSTRAINT payments_method_check CHECK (((payment_method)::text = ANY ((ARRAY['card'::character varying, 'upi'::character varying, 'netbanking'::character varying, 'cod'::character varying, 'wallet'::character varying])::text[]))),
    CONSTRAINT payments_status_check CHECK (((payment_status)::text = ANY ((ARRAY['pending'::character varying, 'completed'::character varying, 'failed'::character varying, 'refunded'::character varying])::text[])))
);


ALTER TABLE public.payments OWNER TO neondb_owner;

--
-- TOC entry 229 (class 1259 OID 49323)
-- Name: payments_payment_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.payments_payment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payments_payment_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3791 (class 0 OID 0)
-- Dependencies: 229
-- Name: payments_payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.payments_payment_id_seq OWNED BY public.payments.payment_id;


--
-- TOC entry 240 (class 1259 OID 49428)
-- Name: product_images; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.product_images (
    image_id integer NOT NULL,
    product_id integer NOT NULL,
    image_url text NOT NULL,
    display_order integer DEFAULT 1,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT product_images_display_order_positive CHECK ((display_order >= 0)),
    CONSTRAINT product_images_url_not_empty CHECK ((length(TRIM(BOTH FROM image_url)) > 0))
);


ALTER TABLE public.product_images OWNER TO neondb_owner;

--
-- TOC entry 253 (class 1259 OID 49703)
-- Name: product_catalogue; Type: VIEW; Schema: public; Owner: neondb_owner
--

CREATE VIEW public.product_catalogue AS
 SELECT p.id AS product_id,
    p.title,
    p.description,
    p.price,
    p.discounted_price,
    p.discount_percent,
    p.quantity,
    p.brand,
    p.color,
    p.image_url,
    p.is_active,
    c.category_id,
    c.name AS category_name,
    pi.image_url AS gallery_image,
    p.created_at
   FROM ((public.products p
     LEFT JOIN public.categories c ON (((p.category)::text = (c.name)::text)))
     LEFT JOIN public.product_images pi ON ((p.id = pi.product_id)))
  WHERE (p.is_active = true);


ALTER VIEW public.product_catalogue OWNER TO neondb_owner;

--
-- TOC entry 239 (class 1259 OID 49427)
-- Name: product_images_image_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.product_images_image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_images_image_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3792 (class 0 OID 0)
-- Dependencies: 239
-- Name: product_images_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.product_images_image_id_seq OWNED BY public.product_images.image_id;


--
-- TOC entry 232 (class 1259 OID 49332)
-- Name: reviews; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    user_id integer NOT NULL,
    product_id integer NOT NULL,
    rating integer NOT NULL,
    review text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5))),
    CONSTRAINT reviews_text_not_empty CHECK (((review IS NULL) OR (length(TRIM(BOTH FROM review)) > 0)))
);


ALTER TABLE public.reviews OWNER TO neondb_owner;

--
-- TOC entry 257 (class 1259 OID 49723)
-- Name: product_review_summary; Type: VIEW; Schema: public; Owner: neondb_owner
--

CREATE VIEW public.product_review_summary AS
 SELECT p.id AS product_id,
    p.title,
    count(r.id) AS total_reviews,
    round(avg(r.rating), 2) AS average_rating
   FROM (public.products p
     LEFT JOIN public.reviews r ON ((p.id = r.product_id)))
  GROUP BY p.id, p.title;


ALTER VIEW public.product_review_summary OWNER TO neondb_owner;

--
-- TOC entry 242 (class 1259 OID 49442)
-- Name: product_variants; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.product_variants (
    variant_id integer NOT NULL,
    product_id integer NOT NULL,
    size character varying(20),
    metal_type character varying(50),
    color character varying(30),
    stock_quantity integer DEFAULT 0,
    additional_price numeric(10,2) DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT product_variants_additional_price_positive CHECK ((additional_price >= (0)::numeric)),
    CONSTRAINT product_variants_metal_not_empty CHECK (((metal_type IS NULL) OR (length(TRIM(BOTH FROM metal_type)) > 0))),
    CONSTRAINT product_variants_size_not_empty CHECK (((size IS NULL) OR (length(TRIM(BOTH FROM size)) > 0))),
    CONSTRAINT product_variants_stock_positive CHECK ((stock_quantity >= 0))
);


ALTER TABLE public.product_variants OWNER TO neondb_owner;

--
-- TOC entry 241 (class 1259 OID 49441)
-- Name: product_variants_variant_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.product_variants_variant_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_variants_variant_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3793 (class 0 OID 0)
-- Dependencies: 241
-- Name: product_variants_variant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.product_variants_variant_id_seq OWNED BY public.product_variants.variant_id;


--
-- TOC entry 221 (class 1259 OID 41045)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3794 (class 0 OID 0)
-- Dependencies: 221
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 231 (class 1259 OID 49331)
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3795 (class 0 OID 0)
-- Dependencies: 231
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- TOC entry 219 (class 1259 OID 41028)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3796 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 234 (class 1259 OID 49344)
-- Name: wishlist; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.wishlist (
    id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.wishlist OWNER TO neondb_owner;

--
-- TOC entry 233 (class 1259 OID 49343)
-- Name: wishlist_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.wishlist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.wishlist_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3797 (class 0 OID 0)
-- Dependencies: 233
-- Name: wishlist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.wishlist_id_seq OWNED BY public.wishlist.id;


--
-- TOC entry 236 (class 1259 OID 49353)
-- Name: wishlist_items; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.wishlist_items (
    id integer NOT NULL,
    wishlist_id integer NOT NULL,
    product_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.wishlist_items OWNER TO neondb_owner;

--
-- TOC entry 235 (class 1259 OID 49352)
-- Name: wishlist_items_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.wishlist_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.wishlist_items_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3798 (class 0 OID 0)
-- Dependencies: 235
-- Name: wishlist_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.wishlist_items_id_seq OWNED BY public.wishlist_items.id;


--
-- TOC entry 3422 (class 2604 OID 49365)
-- Name: addresses address_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.addresses ALTER COLUMN address_id SET DEFAULT nextval('public.addresses_address_id_seq'::regclass);


--
-- TOC entry 3439 (class 2604 OID 49524)
-- Name: cart id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.cart ALTER COLUMN id SET DEFAULT nextval('public.cart_id_seq'::regclass);


--
-- TOC entry 3442 (class 2604 OID 49536)
-- Name: cart_items id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);


--
-- TOC entry 3432 (class 2604 OID 49457)
-- Name: inventory_logs log_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.inventory_logs ALTER COLUMN log_id SET DEFAULT nextval('public.inventory_logs_log_id_seq'::regclass);


--
-- TOC entry 3436 (class 2604 OID 49480)
-- Name: notifications notification_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.notifications ALTER COLUMN notification_id SET DEFAULT nextval('public.notifications_notification_id_seq'::regclass);


--
-- TOC entry 3414 (class 2604 OID 49318)
-- Name: order_items order_item_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.order_items ALTER COLUMN order_item_id SET DEFAULT nextval('public.order_items_order_item_id_seq'::regclass);


--
-- TOC entry 3434 (class 2604 OID 49467)
-- Name: order_status_history history_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.order_status_history ALTER COLUMN history_id SET DEFAULT nextval('public.order_status_history_history_id_seq'::regclass);


--
-- TOC entry 3409 (class 2604 OID 49306)
-- Name: orders order_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);


--
-- TOC entry 3415 (class 2604 OID 49327)
-- Name: payments payment_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.payments ALTER COLUMN payment_id SET DEFAULT nextval('public.payments_payment_id_seq'::regclass);


--
-- TOC entry 3425 (class 2604 OID 49431)
-- Name: product_images image_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.product_images ALTER COLUMN image_id SET DEFAULT nextval('public.product_images_image_id_seq'::regclass);


--
-- TOC entry 3428 (class 2604 OID 49445)
-- Name: product_variants variant_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.product_variants ALTER COLUMN variant_id SET DEFAULT nextval('public.product_variants_variant_id_seq'::regclass);


--
-- TOC entry 3398 (class 2604 OID 41049)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 3416 (class 2604 OID 49335)
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- TOC entry 3394 (class 2604 OID 41032)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3418 (class 2604 OID 49347)
-- Name: wishlist id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.wishlist ALTER COLUMN id SET DEFAULT nextval('public.wishlist_id_seq'::regclass);


--
-- TOC entry 3420 (class 2604 OID 49356)
-- Name: wishlist_items id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.wishlist_items ALTER COLUMN id SET DEFAULT nextval('public.wishlist_items_id_seq'::regclass);


--
-- TOC entry 3763 (class 0 OID 49362)
-- Dependencies: 238
-- Data for Name: addresses; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.addresses (address_id, user_id, full_name, phone, address_line1, address_line2, city, state, pincode, country, is_default) FROM stdin;
\.


--
-- TOC entry 3775 (class 0 OID 49521)
-- Dependencies: 250
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.cart (id, user_id, created_at, updated_at) FROM stdin;
1	1	2026-07-10 12:26:39.815221	2026-07-10 12:26:39.815221
\.


--
-- TOC entry 3777 (class 0 OID 49533)
-- Dependencies: 252
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.cart_items (id, cart_id, product_id, quantity, price_at_time, subtotal) FROM stdin;
3	1	1	2	5000.00	10000.00
\.


--
-- TOC entry 3748 (class 0 OID 41082)
-- Dependencies: 223
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.categories (category_id, name, description, image_url, created_at) FROM stdin;
\.


--
-- TOC entry 3749 (class 0 OID 49229)
-- Dependencies: 224
-- Data for Name: coupons; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.coupons (coupon_id, code, discount_type, discount_value, min_order_amount, max_discount, expiry_date, is_active, created_at) FROM stdin;
\.


--
-- TOC entry 3769 (class 0 OID 49454)
-- Dependencies: 244
-- Data for Name: inventory_logs; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.inventory_logs (log_id, product_id, old_stock, new_stock, change_reason, changed_by, created_at) FROM stdin;
1	1	50	49	Stock updated	\N	2026-07-10 12:23:05.399355
2	1	49	54	Stock updated	\N	2026-07-10 12:27:59.171526
3	1	54	59	Stock updated	\N	2026-07-10 12:28:07.145042
\.


--
-- TOC entry 3773 (class 0 OID 49477)
-- Dependencies: 248
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.notifications (notification_id, user_id, title, message, is_read, created_at) FROM stdin;
\.


--
-- TOC entry 3753 (class 0 OID 49315)
-- Dependencies: 228
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.order_items (order_item_id, order_id, product_id, quantity, price_at_purchase) FROM stdin;
\.


--
-- TOC entry 3771 (class 0 OID 49464)
-- Dependencies: 246
-- Data for Name: order_status_history; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.order_status_history (history_id, order_id, status, remarks, updated_at) FROM stdin;
\.


--
-- TOC entry 3751 (class 0 OID 49303)
-- Dependencies: 226
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.orders (order_id, user_id, address_id, total_amount, status, payment_status, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3755 (class 0 OID 49324)
-- Dependencies: 230
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.payments (payment_id, order_id, payment_method, payment_status, transaction_id, amount, paid_at) FROM stdin;
\.


--
-- TOC entry 3765 (class 0 OID 49428)
-- Dependencies: 240
-- Data for Name: product_images; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.product_images (image_id, product_id, image_url, display_order, created_at) FROM stdin;
\.


--
-- TOC entry 3767 (class 0 OID 49442)
-- Dependencies: 242
-- Data for Name: product_variants; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.product_variants (variant_id, product_id, size, metal_type, color, stock_quantity, additional_price, created_at) FROM stdin;
\.


--
-- TOC entry 3747 (class 0 OID 41046)
-- Dependencies: 222
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.products (id, title, description, price, discounted_price, discount_percent, quantity, brand, color, image_url, category, is_active, created_at, updated_at) FROM stdin;
2	Diamond Eternity Necklace	Stunning sterling silver pendant embedded with conflict-free brilliant lab diamonds.	899.00	799.00	11	15	MK Jewellers	Silver	https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=500	Necklaces	t	2026-07-09 07:15:27.775922+00	2026-07-10 12:21:12.668565
3	Luxury Emerald Earrings	Beautiful drop earrings featuring teardrop natural emeralds lined with white gold accent chains.	450.00	450.00	0	20	MK Jewellers	Green/Gold	https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=500	Earrings	t	2026-07-09 07:15:27.775922+00	2026-07-10 12:21:12.668565
1	Classic Gold Ring	Elegant 18k yellow gold minimalist band ring perfect for daily wear.	299.99	249.99	16	59	MK Jewellers	Gold	https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=500	Rings	t	2026-07-09 07:15:27.775922+00	2026-07-10 12:21:12.668565
\.


--
-- TOC entry 3757 (class 0 OID 49332)
-- Dependencies: 232
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.reviews (id, user_id, product_id, rating, review, created_at) FROM stdin;
\.


--
-- TOC entry 3745 (class 0 OID 41029)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.users (id, email, password_hash, full_name, role, profile_image, is_verified, created_at) FROM stdin;
1	ashishcollegework@gmail.com	$2b$10$oISwWnY1PjelUBofaD6ELeMUXIV1c6PT8WzfP6E43cEGjMNQOzVwy	Ashish	customer	\N	t	2026-07-09 11:05:31.680642+00
2	ashish8789727954@gmail.com	$2b$10$2yZK74BWpfyKlShBhxTgauGvPk/y2KqXAzjkr/XlT0VhOmGPP3nSK	Ashish	customer	\N	t	2026-07-09 11:17:19.552286+00
3	admin@mks.com	$2b$10$a07A7qPGNKeFnnlEQ9w/wewX8dXIdC	MKS Admin	admin	\N	t	2026-07-10 10:55:50.939332+00
\.


--
-- TOC entry 3759 (class 0 OID 49344)
-- Dependencies: 234
-- Data for Name: wishlist; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.wishlist (id, user_id, created_at) FROM stdin;
\.


--
-- TOC entry 3761 (class 0 OID 49353)
-- Dependencies: 236
-- Data for Name: wishlist_items; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.wishlist_items (id, wishlist_id, product_id, created_at) FROM stdin;
\.


--
-- TOC entry 3799 (class 0 OID 0)
-- Dependencies: 237
-- Name: addresses_address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.addresses_address_id_seq', 1, false);


--
-- TOC entry 3800 (class 0 OID 0)
-- Dependencies: 249
-- Name: cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.cart_id_seq', 1, true);


--
-- TOC entry 3801 (class 0 OID 0)
-- Dependencies: 251
-- Name: cart_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.cart_items_id_seq', 3, true);


--
-- TOC entry 3802 (class 0 OID 0)
-- Dependencies: 243
-- Name: inventory_logs_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.inventory_logs_log_id_seq', 3, true);


--
-- TOC entry 3803 (class 0 OID 0)
-- Dependencies: 247
-- Name: notifications_notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.notifications_notification_id_seq', 1, false);


--
-- TOC entry 3804 (class 0 OID 0)
-- Dependencies: 227
-- Name: order_items_order_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.order_items_order_item_id_seq', 1, false);


--
-- TOC entry 3805 (class 0 OID 0)
-- Dependencies: 245
-- Name: order_status_history_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.order_status_history_history_id_seq', 1, false);


--
-- TOC entry 3806 (class 0 OID 0)
-- Dependencies: 225
-- Name: orders_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.orders_order_id_seq', 1, false);


--
-- TOC entry 3807 (class 0 OID 0)
-- Dependencies: 229
-- Name: payments_payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.payments_payment_id_seq', 1, false);


--
-- TOC entry 3808 (class 0 OID 0)
-- Dependencies: 239
-- Name: product_images_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.product_images_image_id_seq', 1, false);


--
-- TOC entry 3809 (class 0 OID 0)
-- Dependencies: 241
-- Name: product_variants_variant_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.product_variants_variant_id_seq', 1, false);


--
-- TOC entry 3810 (class 0 OID 0)
-- Dependencies: 221
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.products_id_seq', 3, true);


--
-- TOC entry 3811 (class 0 OID 0)
-- Dependencies: 231
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.reviews_id_seq', 1, false);


--
-- TOC entry 3812 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- TOC entry 3813 (class 0 OID 0)
-- Dependencies: 233
-- Name: wishlist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.wishlist_id_seq', 1, false);


--
-- TOC entry 3814 (class 0 OID 0)
-- Dependencies: 235
-- Name: wishlist_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.wishlist_items_id_seq', 1, false);


--
-- TOC entry 3537 (class 2606 OID 49371)
-- Name: addresses addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_pkey PRIMARY KEY (address_id);


--
-- TOC entry 3560 (class 2606 OID 49541)
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- TOC entry 3555 (class 2606 OID 49529)
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (id);


--
-- TOC entry 3557 (class 2606 OID 49531)
-- Name: cart cart_user_id_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_user_id_key UNIQUE (user_id);


--
-- TOC entry 3500 (class 2606 OID 49573)
-- Name: categories categories_name_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_unique UNIQUE (name);


--
-- TOC entry 3502 (class 2606 OID 49571)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);


--
-- TOC entry 3505 (class 2606 OID 49243)
-- Name: coupons coupons_code_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key UNIQUE (code);


--
-- TOC entry 3507 (class 2606 OID 49241)
-- Name: coupons coupons_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_pkey PRIMARY KEY (coupon_id);


--
-- TOC entry 3548 (class 2606 OID 49462)
-- Name: inventory_logs inventory_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.inventory_logs
    ADD CONSTRAINT inventory_logs_pkey PRIMARY KEY (log_id);


--
-- TOC entry 3553 (class 2606 OID 49488)
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (notification_id);


--
-- TOC entry 3518 (class 2606 OID 49322)
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (order_item_id);


--
-- TOC entry 3550 (class 2606 OID 49475)
-- Name: order_status_history order_status_history_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.order_status_history
    ADD CONSTRAINT order_status_history_pkey PRIMARY KEY (history_id);


--
-- TOC entry 3514 (class 2606 OID 49313)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);


--
-- TOC entry 3521 (class 2606 OID 49330)
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (payment_id);


--
-- TOC entry 3541 (class 2606 OID 49440)
-- Name: product_images product_images_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_pkey PRIMARY KEY (image_id);


--
-- TOC entry 3544 (class 2606 OID 49452)
-- Name: product_variants product_variants_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.product_variants
    ADD CONSTRAINT product_variants_pkey PRIMARY KEY (variant_id);


--
-- TOC entry 3498 (class 2606 OID 41061)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 3526 (class 2606 OID 49342)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- TOC entry 3488 (class 2606 OID 41044)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3490 (class 2606 OID 41042)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3533 (class 2606 OID 49360)
-- Name: wishlist_items wishlist_items_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.wishlist_items
    ADD CONSTRAINT wishlist_items_pkey PRIMARY KEY (id);


--
-- TOC entry 3535 (class 2606 OID 49612)
-- Name: wishlist_items wishlist_items_unique_product; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.wishlist_items
    ADD CONSTRAINT wishlist_items_unique_product UNIQUE (wishlist_id, product_id);


--
-- TOC entry 3529 (class 2606 OID 49351)
-- Name: wishlist wishlist_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.wishlist
    ADD CONSTRAINT wishlist_pkey PRIMARY KEY (id);


--
-- TOC entry 3531 (class 2606 OID 49607)
-- Name: wishlist wishlist_user_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.wishlist
    ADD CONSTRAINT wishlist_user_unique UNIQUE (user_id);


--
-- TOC entry 3538 (class 1259 OID 49675)
-- Name: idx_addresses_user; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_addresses_user ON public.addresses USING btree (user_id);


--
-- TOC entry 3558 (class 1259 OID 49676)
-- Name: idx_cart_user; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_cart_user ON public.cart USING btree (user_id);


--
-- TOC entry 3561 (class 1259 OID 49677)
-- Name: idx_cartitems_cart; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_cartitems_cart ON public.cart_items USING btree (cart_id);


--
-- TOC entry 3562 (class 1259 OID 49678)
-- Name: idx_cartitems_product; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_cartitems_product ON public.cart_items USING btree (product_id);


--
-- TOC entry 3503 (class 1259 OID 49679)
-- Name: idx_categories_name; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_categories_name ON public.categories USING btree (name);


--
-- TOC entry 3508 (class 1259 OID 49702)
-- Name: idx_coupons_active; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_coupons_active ON public.coupons USING btree (code, is_active);


--
-- TOC entry 3545 (class 1259 OID 49692)
-- Name: idx_inventory_product; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_inventory_product ON public.inventory_logs USING btree (product_id);


--
-- TOC entry 3546 (class 1259 OID 49701)
-- Name: idx_inventory_product_date; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_inventory_product_date ON public.inventory_logs USING btree (product_id, created_at DESC);


--
-- TOC entry 3551 (class 1259 OID 49691)
-- Name: idx_notifications_user; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_notifications_user ON public.notifications USING btree (user_id);


--
-- TOC entry 3515 (class 1259 OID 49680)
-- Name: idx_orderitems_order; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_orderitems_order ON public.order_items USING btree (order_id);


--
-- TOC entry 3516 (class 1259 OID 49681)
-- Name: idx_orderitems_product; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_orderitems_product ON public.order_items USING btree (product_id);


--
-- TOC entry 3509 (class 1259 OID 49699)
-- Name: idx_orders_created_at; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_orders_created_at ON public.orders USING btree (created_at DESC);


--
-- TOC entry 3510 (class 1259 OID 49683)
-- Name: idx_orders_status; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_orders_status ON public.orders USING btree (status);


--
-- TOC entry 3511 (class 1259 OID 49682)
-- Name: idx_orders_user; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_orders_user ON public.orders USING btree (user_id);


--
-- TOC entry 3512 (class 1259 OID 49698)
-- Name: idx_orders_user_status; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_orders_user_status ON public.orders USING btree (user_id, status);


--
-- TOC entry 3519 (class 1259 OID 49684)
-- Name: idx_payments_order; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_payments_order ON public.payments USING btree (order_id);


--
-- TOC entry 3539 (class 1259 OID 49693)
-- Name: idx_product_images_product; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_product_images_product ON public.product_images USING btree (product_id);


--
-- TOC entry 3542 (class 1259 OID 49694)
-- Name: idx_product_variants_product; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_product_variants_product ON public.product_variants USING btree (product_id);


--
-- TOC entry 3491 (class 1259 OID 49695)
-- Name: idx_products_active; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_products_active ON public.products USING btree (is_active);


--
-- TOC entry 3492 (class 1259 OID 49696)
-- Name: idx_products_brand; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_products_brand ON public.products USING btree (brand);


--
-- TOC entry 3493 (class 1259 OID 49685)
-- Name: idx_products_category; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_products_category ON public.products USING btree (category);


--
-- TOC entry 3494 (class 1259 OID 49697)
-- Name: idx_products_category_price; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_products_category_price ON public.products USING btree (category, price);


--
-- TOC entry 3495 (class 1259 OID 49686)
-- Name: idx_products_name; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_products_name ON public.products USING btree (title);


--
-- TOC entry 3496 (class 1259 OID 49687)
-- Name: idx_products_price; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_products_price ON public.products USING btree (price);


--
-- TOC entry 3522 (class 1259 OID 49688)
-- Name: idx_reviews_product; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_reviews_product ON public.reviews USING btree (product_id);


--
-- TOC entry 3523 (class 1259 OID 49700)
-- Name: idx_reviews_product_created; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_reviews_product_created ON public.reviews USING btree (product_id, created_at DESC);


--
-- TOC entry 3524 (class 1259 OID 49689)
-- Name: idx_reviews_user; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_reviews_user ON public.reviews USING btree (user_id);


--
-- TOC entry 3527 (class 1259 OID 49690)
-- Name: idx_wishlist_user; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_wishlist_user ON public.wishlist USING btree (user_id);


--
-- TOC entry 3743 (class 2618 OID 49740)
-- Name: customer_summary _RETURN; Type: RULE; Schema: public; Owner: neondb_owner
--

CREATE OR REPLACE VIEW public.customer_summary AS
 SELECT u.id AS user_id,
    u.full_name,
    u.email,
    u.created_at,
    count(o.order_id) AS total_orders,
    COALESCE(sum(o.total_amount), (0)::numeric) AS total_spent
   FROM (public.users u
     LEFT JOIN public.orders o ON ((u.id = o.user_id)))
  WHERE ((u.role)::text = 'customer'::text)
  GROUP BY u.id;


--
-- TOC entry 3588 (class 2620 OID 49751)
-- Name: cart_items cart_items_subtotal_trigger; Type: TRIGGER; Schema: public; Owner: neondb_owner
--

CREATE TRIGGER cart_items_subtotal_trigger BEFORE INSERT OR UPDATE OF quantity, price_at_time ON public.cart_items FOR EACH ROW EXECUTE FUNCTION public.calculate_cart_item_subtotal();


--
-- TOC entry 3587 (class 2620 OID 49745)
-- Name: cart cart_updated_at_trigger; Type: TRIGGER; Schema: public; Owner: neondb_owner
--

CREATE TRIGGER cart_updated_at_trigger BEFORE UPDATE ON public.cart FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- TOC entry 3585 (class 2620 OID 49749)
-- Name: orders order_status_history_trigger; Type: TRIGGER; Schema: public; Owner: neondb_owner
--

CREATE TRIGGER order_status_history_trigger AFTER UPDATE OF status ON public.orders FOR EACH ROW EXECUTE FUNCTION public.log_order_status_change();


--
-- TOC entry 3586 (class 2620 OID 49744)
-- Name: orders orders_updated_at_trigger; Type: TRIGGER; Schema: public; Owner: neondb_owner
--

CREATE TRIGGER orders_updated_at_trigger BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- TOC entry 3583 (class 2620 OID 49753)
-- Name: products product_discount_trigger; Type: TRIGGER; Schema: public; Owner: neondb_owner
--

CREATE TRIGGER product_discount_trigger BEFORE INSERT OR UPDATE OF price, discount_percent ON public.products FOR EACH ROW EXECUTE FUNCTION public.calculate_discounted_price();


--
-- TOC entry 3584 (class 2620 OID 49747)
-- Name: products product_inventory_change_trigger; Type: TRIGGER; Schema: public; Owner: neondb_owner
--

CREATE TRIGGER product_inventory_change_trigger AFTER UPDATE OF quantity ON public.products FOR EACH ROW EXECUTE FUNCTION public.log_inventory_change();


--
-- TOC entry 3573 (class 2606 OID 49372)
-- Name: addresses fk_addresses_user; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT fk_addresses_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3580 (class 2606 OID 49542)
-- Name: cart fk_cart_user; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3581 (class 2606 OID 49547)
-- Name: cart_items fk_cartitems_cart; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT fk_cartitems_cart FOREIGN KEY (cart_id) REFERENCES public.cart(id) ON DELETE CASCADE;


--
-- TOC entry 3582 (class 2606 OID 49552)
-- Name: cart_items fk_cartitems_product; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT fk_cartitems_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 3576 (class 2606 OID 49504)
-- Name: inventory_logs fk_inventory_admin; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.inventory_logs
    ADD CONSTRAINT fk_inventory_admin FOREIGN KEY (changed_by) REFERENCES public.users(id);


--
-- TOC entry 3577 (class 2606 OID 49499)
-- Name: inventory_logs fk_inventory_product; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.inventory_logs
    ADD CONSTRAINT fk_inventory_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 3579 (class 2606 OID 49514)
-- Name: notifications fk_notifications_user; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3578 (class 2606 OID 49509)
-- Name: order_status_history fk_order_history_order; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.order_status_history
    ADD CONSTRAINT fk_order_history_order FOREIGN KEY (order_id) REFERENCES public.orders(order_id) ON DELETE CASCADE;


--
-- TOC entry 3565 (class 2606 OID 49387)
-- Name: order_items fk_orderitems_order; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT fk_orderitems_order FOREIGN KEY (order_id) REFERENCES public.orders(order_id) ON DELETE CASCADE;


--
-- TOC entry 3566 (class 2606 OID 49392)
-- Name: order_items fk_orderitems_product; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT fk_orderitems_product FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- TOC entry 3563 (class 2606 OID 49382)
-- Name: orders fk_orders_address; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_orders_address FOREIGN KEY (address_id) REFERENCES public.addresses(address_id);


--
-- TOC entry 3564 (class 2606 OID 49377)
-- Name: orders fk_orders_user; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3567 (class 2606 OID 49397)
-- Name: payments fk_payments_order; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT fk_payments_order FOREIGN KEY (order_id) REFERENCES public.orders(order_id);


--
-- TOC entry 3574 (class 2606 OID 49489)
-- Name: product_images fk_product_images_product; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT fk_product_images_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 3575 (class 2606 OID 49494)
-- Name: product_variants fk_product_variants_product; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.product_variants
    ADD CONSTRAINT fk_product_variants_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 3568 (class 2606 OID 49407)
-- Name: reviews fk_reviews_product; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_reviews_product FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- TOC entry 3569 (class 2606 OID 49402)
-- Name: reviews fk_reviews_user; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_reviews_user FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3570 (class 2606 OID 49412)
-- Name: wishlist fk_wishlist_user; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.wishlist
    ADD CONSTRAINT fk_wishlist_user FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3571 (class 2606 OID 49422)
-- Name: wishlist_items fk_wishlistitems_product; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.wishlist_items
    ADD CONSTRAINT fk_wishlistitems_product FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- TOC entry 3572 (class 2606 OID 49417)
-- Name: wishlist_items fk_wishlistitems_wishlist; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.wishlist_items
    ADD CONSTRAINT fk_wishlistitems_wishlist FOREIGN KEY (wishlist_id) REFERENCES public.wishlist(id) ON DELETE CASCADE;


--
-- TOC entry 2176 (class 826 OID 16397)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- TOC entry 2175 (class 826 OID 16396)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


-- Completed on 2026-07-10 18:06:17

--
-- PostgreSQL database dump complete
--

\unrestrict XhUKQ8bXPFjUSc5WQbQr6PDsxhiiOOaPqbSFipxbOQeh3d8OvrjS2rgCgR48Jgg

