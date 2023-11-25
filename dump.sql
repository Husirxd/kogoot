--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0 (Debian 16.0-1.pgdg120+1)
-- Dumped by pg_dump version 16.0 (Debian 16.0-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: answer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.answer (
    id integer NOT NULL,
    answer character varying NOT NULL,
    "isCorrect" integer NOT NULL,
    "questionId" integer
);


ALTER TABLE public.answer OWNER TO postgres;

--
-- Name: answer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.answer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.answer_id_seq OWNER TO postgres;

--
-- Name: answer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.answer_id_seq OWNED BY public.answer.id;


--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id integer NOT NULL,
    category character varying NOT NULL,
    "categoryName" character varying NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_id_seq OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- Name: category_quizzes_quiz; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category_quizzes_quiz (
    "categoryId" integer NOT NULL,
    "quizId" integer NOT NULL
);


ALTER TABLE public.category_quizzes_quiz OWNER TO postgres;

--
-- Name: question; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.question (
    id integer NOT NULL,
    question character varying NOT NULL,
    image character varying,
    "quizId" integer
);


ALTER TABLE public.question OWNER TO postgres;

--
-- Name: question_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.question_id_seq OWNER TO postgres;

--
-- Name: question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.question_id_seq OWNED BY public.question.id;


--
-- Name: quiz; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quiz (
    id integer NOT NULL,
    uid character varying NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    status character varying NOT NULL,
    image character varying,
    "userId" integer
);


ALTER TABLE public.quiz OWNER TO postgres;

--
-- Name: quiz_categories_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quiz_categories_category (
    "quizId" integer NOT NULL,
    "categoryId" integer NOT NULL
);


ALTER TABLE public.quiz_categories_category OWNER TO postgres;

--
-- Name: quiz_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quiz_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quiz_id_seq OWNER TO postgres;

--
-- Name: quiz_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quiz_id_seq OWNED BY public.quiz.id;


--
-- Name: result; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.result (
    id integer NOT NULL,
    uid character varying NOT NULL,
    "participantId" integer,
    score integer NOT NULL,
    answers jsonb DEFAULT '{}'::jsonb NOT NULL,
    "participatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "authorId" integer,
    "quizId" integer,
    "quizUid" character varying NOT NULL
);


ALTER TABLE public.result OWNER TO postgres;

--
-- Name: result_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.result_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.result_id_seq OWNER TO postgres;

--
-- Name: result_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.result_id_seq OWNED BY public.result.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    uid character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    nickname character varying NOT NULL,
    avatar character varying
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: answer id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answer ALTER COLUMN id SET DEFAULT nextval('public.answer_id_seq'::regclass);


--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: question id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question ALTER COLUMN id SET DEFAULT nextval('public.question_id_seq'::regclass);


--
-- Name: quiz id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz ALTER COLUMN id SET DEFAULT nextval('public.quiz_id_seq'::regclass);


--
-- Name: result id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.result ALTER COLUMN id SET DEFAULT nextval('public.result_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: answer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.answer (id, answer, "isCorrect", "questionId") FROM stdin;
3	Good	1	7
4	Bad	0	7
5	Good	1	8
6	Bad	0	8
7	Also bad	0	8
8	Good	1	9
9	Bad	0	9
10	Good	1	10
11	Bad	0	10
12	Good	1	11
13	Bad	0	11
14	To my mamy kawiarnie?	0	12
15	Jak niedopałki Lucky Strike'ow	1	12
16	Wspaniale	0	12
17	Za wysokie	1	13
18	Dostateczne	0	13
19	Rankingi nie liczą się dla naszej uczelni (xD)	0	13
20	Nie	0	14
21	Tak, kiedyś był tam jarmark	0	14
22	Chodzą legendy	0	14
23	Tak, ale okazało się że znalazła się tam przez przypadek	1	14
24	Tak	0	15
25	Na pewno	0	15
26	Zobaczymy	0	15
27	Czas pokaże	1	15
28	test	1	16
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id, category, "categoryName") FROM stdin;
1	cuisine	Cuisine
\.


--
-- Data for Name: category_quizzes_quiz; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category_quizzes_quiz ("categoryId", "quizId") FROM stdin;
\.


--
-- Data for Name: question; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.question (id, question, image, "quizId") FROM stdin;
7	Test	\N	7
8	Test	\N	7
9	Test	\N	7
10	Test	\N	7
11	Test	\N	7
12	Jak smakuje kawa w łupince?	/app/uploads/cb5545eb-63f7-40d3-bfbf-89088ad9d3ef.jpg	8
13	Które miejsce zajmuje PK w rankingu uczelni?	/app/uploads/ce40a02c-4be6-4135-bd3c-5f61152e71e4.jpg	8
14	Czy widziano kiedyś osobę mogącą uchodzić za szczęśliwą na kampusie?	\N	8
15	Czy politechnika osiągnie międzynarodowy sukces?	\N	8
16	test	\N	9
\.


--
-- Data for Name: quiz; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quiz (id, uid, title, description, "createdAt", status, image, "userId") FROM stdin;
7	fbf14a2a-4b44-4a77-89e5-8621aafc7d61	Test Results	Quiz for testing result page	2023-11-13 19:40:49.171692	published	\N	1
9	6567b59e-7e05-4f64-991f-3c23636253bf	test kategorii	test	2023-11-23 10:45:09.367731	published		1
8	1e689805-0ec0-4e86-aecd-7ed3e8e0a9dc	Jak dobrze znasz politechnikę?	Wspaniała uczelnia, wspaniałe miejsce. Nigdy więcej	2023-11-22 08:54:19.57645	published	/app/uploads/3bc17131-21ef-4827-b355-75ad8e62f625.jpg	1
\.


--
-- Data for Name: quiz_categories_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quiz_categories_category ("quizId", "categoryId") FROM stdin;
9	1
\.


--
-- Data for Name: result; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.result (id, uid, "participantId", score, answers, "participatedAt", "authorId", "quizId", "quizUid") FROM stdin;
12	565fd1fc-70c2-4c5a-9832-5976b62338cc	1	1	"[{\\"questionId\\":9,\\"chosenAnswerId\\":8},{\\"questionId\\":10,\\"chosenAnswerId\\":11},{\\"questionId\\":11,\\"chosenAnswerId\\":13},{\\"questionId\\":7,\\"chosenAnswerId\\":4},{\\"questionId\\":8,\\"chosenAnswerId\\":6}]"	2023-11-13 20:08:31.997002	1	7	fbf14a2a-4b44-4a77-89e5-8621aafc7d61
13	5091f15f-a293-4177-8706-2788a9cee214	1	3	"[{\\"questionId\\":9,\\"chosenAnswerId\\":8},{\\"questionId\\":10,\\"chosenAnswerId\\":10},{\\"questionId\\":8,\\"chosenAnswerId\\":5},{\\"questionId\\":7,\\"chosenAnswerId\\":4},{\\"questionId\\":11,\\"chosenAnswerId\\":13}]"	2023-11-13 20:08:43.115736	1	7	fbf14a2a-4b44-4a77-89e5-8621aafc7d61
14	ad473278-bc20-441b-b245-81cd50dfd6ab	1	5	"[{\\"questionId\\":7,\\"chosenAnswerId\\":3},{\\"questionId\\":8,\\"chosenAnswerId\\":5},{\\"questionId\\":9,\\"chosenAnswerId\\":8},{\\"questionId\\":10,\\"chosenAnswerId\\":10},{\\"questionId\\":11,\\"chosenAnswerId\\":12}]"	2023-11-13 20:08:50.294203	1	7	fbf14a2a-4b44-4a77-89e5-8621aafc7d61
15	9a4c3b1a-5125-485c-9a68-fd04b72ad6d5	1	3	"[{\\"questionId\\":8,\\"chosenAnswerId\\":6},{\\"questionId\\":9,\\"chosenAnswerId\\":9},{\\"questionId\\":10,\\"chosenAnswerId\\":10},{\\"questionId\\":11,\\"chosenAnswerId\\":12},{\\"questionId\\":7,\\"chosenAnswerId\\":3}]"	2023-11-13 20:08:58.077887	1	7	fbf14a2a-4b44-4a77-89e5-8621aafc7d61
16	731900b5-4bf4-4309-9d6c-102acb12359c	1	2	"[{\\"questionId\\":8,\\"chosenAnswerId\\":5},{\\"questionId\\":9,\\"chosenAnswerId\\":8},{\\"questionId\\":10,\\"chosenAnswerId\\":11},{\\"questionId\\":11,\\"chosenAnswerId\\":13},{\\"questionId\\":7,\\"chosenAnswerId\\":4}]"	2023-11-14 11:01:10.879836	1	7	fbf14a2a-4b44-4a77-89e5-8621aafc7d61
17	bb057803-cceb-4430-b1d1-8ea11390f58d	1	2	"[{\\"questionId\\":15,\\"chosenAnswerId\\":24},{\\"questionId\\":15,\\"chosenAnswerId\\":27},{\\"questionId\\":14,\\"chosenAnswerId\\":21},{\\"questionId\\":13,\\"chosenAnswerId\\":19},{\\"questionId\\":12,\\"chosenAnswerId\\":15}]"	2023-11-22 10:08:42.656225	1	8	1e689805-0ec0-4e86-aecd-7ed3e8e0a9dc
18	147a2616-2734-4fb2-bc9e-11cdacbc0ee7	1	0	"[{\\"questionId\\":12,\\"chosenAnswerId\\":14},{\\"questionId\\":13,\\"chosenAnswerId\\":19},{\\"questionId\\":14,\\"chosenAnswerId\\":20},{\\"questionId\\":15,\\"chosenAnswerId\\":26}]"	2023-11-22 10:09:09.305477	1	8	1e689805-0ec0-4e86-aecd-7ed3e8e0a9dc
19	c5ac065d-14f3-4f83-8617-164feb3f6ba8	1	0	"[{\\"questionId\\":12,\\"chosenAnswerId\\":14},{\\"questionId\\":13,\\"chosenAnswerId\\":19},{\\"questionId\\":14,\\"chosenAnswerId\\":20},{\\"questionId\\":15,\\"chosenAnswerId\\":26}]"	2023-11-22 10:09:11.146122	1	8	1e689805-0ec0-4e86-aecd-7ed3e8e0a9dc
20	9a1e3863-7d72-4a81-9c49-528f96ce57bc	1	0	"[{\\"questionId\\":12,\\"chosenAnswerId\\":14},{\\"questionId\\":13,\\"chosenAnswerId\\":19},{\\"questionId\\":14,\\"chosenAnswerId\\":20},{\\"questionId\\":15,\\"chosenAnswerId\\":26}]"	2023-11-22 10:09:31.751621	1	8	1e689805-0ec0-4e86-aecd-7ed3e8e0a9dc
21	91af764e-fad5-4864-a66a-be85d0e80b89	1	0	"[{\\"questionId\\":12,\\"chosenAnswerId\\":14},{\\"questionId\\":13,\\"chosenAnswerId\\":19},{\\"questionId\\":14,\\"chosenAnswerId\\":20},{\\"questionId\\":15,\\"chosenAnswerId\\":26}]"	2023-11-22 10:09:32.603564	1	8	1e689805-0ec0-4e86-aecd-7ed3e8e0a9dc
22	568aaa78-5f30-44dc-b26b-5d08d079cc67	1	0	"[{\\"questionId\\":12,\\"chosenAnswerId\\":14},{\\"questionId\\":13,\\"chosenAnswerId\\":19},{\\"questionId\\":14,\\"chosenAnswerId\\":20},{\\"questionId\\":15,\\"chosenAnswerId\\":26}]"	2023-11-22 10:09:44.720462	1	8	1e689805-0ec0-4e86-aecd-7ed3e8e0a9dc
23	0cdf7110-c12c-425f-b5c0-ece9bbeb9533	1	0	"[{\\"questionId\\":12,\\"chosenAnswerId\\":14},{\\"questionId\\":13,\\"chosenAnswerId\\":19},{\\"questionId\\":14,\\"chosenAnswerId\\":20},{\\"questionId\\":15,\\"chosenAnswerId\\":26}]"	2023-11-22 10:09:45.694013	1	8	1e689805-0ec0-4e86-aecd-7ed3e8e0a9dc
24	7e427fcc-9856-4a81-a0ca-a63c6305ce1c	1	1	"[{\\"questionId\\":12,\\"chosenAnswerId\\":14},{\\"questionId\\":13,\\"chosenAnswerId\\":17},{\\"questionId\\":14,\\"chosenAnswerId\\":22},{\\"questionId\\":15,\\"chosenAnswerId\\":24}]"	2023-11-22 10:09:52.508311	1	8	1e689805-0ec0-4e86-aecd-7ed3e8e0a9dc
25	482ad12a-1739-43ec-a4e9-3794a55e57bc	1	1	"[{\\"questionId\\":12,\\"chosenAnswerId\\":14},{\\"questionId\\":13,\\"chosenAnswerId\\":17},{\\"questionId\\":14,\\"chosenAnswerId\\":22},{\\"questionId\\":15,\\"chosenAnswerId\\":24}]"	2023-11-22 10:11:14.049299	1	8	1e689805-0ec0-4e86-aecd-7ed3e8e0a9dc
26	083b7548-aca2-4683-a042-cb86f7fa5f81	1	1	"[{\\"questionId\\":12,\\"chosenAnswerId\\":14},{\\"questionId\\":13,\\"chosenAnswerId\\":17},{\\"questionId\\":14,\\"chosenAnswerId\\":22},{\\"questionId\\":15,\\"chosenAnswerId\\":24}]"	2023-11-22 10:11:35.835512	1	8	1e689805-0ec0-4e86-aecd-7ed3e8e0a9dc
27	b1b08f3b-8720-495a-93cf-004540ae33c5	1	1	"[{\\"questionId\\":12,\\"chosenAnswerId\\":14},{\\"questionId\\":13,\\"chosenAnswerId\\":19},{\\"questionId\\":14,\\"chosenAnswerId\\":23},{\\"questionId\\":15,\\"chosenAnswerId\\":24}]"	2023-11-22 10:11:50.934594	1	8	1e689805-0ec0-4e86-aecd-7ed3e8e0a9dc
28	20f65615-67f4-41fd-8764-50528ab1faab	1	1	"[{\\"questionId\\":12,\\"chosenAnswerId\\":14},{\\"questionId\\":13,\\"chosenAnswerId\\":19},{\\"questionId\\":14,\\"chosenAnswerId\\":23},{\\"questionId\\":15,\\"chosenAnswerId\\":24}]"	2023-11-22 10:12:02.088477	1	8	1e689805-0ec0-4e86-aecd-7ed3e8e0a9dc
29	b1b7478a-be35-4f91-b810-6f48673c9b13	1	0	"[{\\"questionId\\":12,\\"chosenAnswerId\\":16},{\\"questionId\\":13,\\"chosenAnswerId\\":18},{\\"questionId\\":14,\\"chosenAnswerId\\":22},{\\"questionId\\":15,\\"chosenAnswerId\\":25}]"	2023-11-22 10:21:43.459086	1	8	1e689805-0ec0-4e86-aecd-7ed3e8e0a9dc
30	0ec7976b-1dcd-4b84-aa38-46a3b7fd9508	1	0	"[{\\"questionId\\":12,\\"chosenAnswerId\\":16},{\\"questionId\\":13,\\"chosenAnswerId\\":18},{\\"questionId\\":14,\\"chosenAnswerId\\":22},{\\"questionId\\":15,\\"chosenAnswerId\\":25}]"	2023-11-22 10:22:07.451996	1	8	1e689805-0ec0-4e86-aecd-7ed3e8e0a9dc
31	e2968037-e750-40cd-9212-7553eb84e624	1	2	"[{\\"questionId\\":12,\\"chosenAnswerId\\":15},{\\"questionId\\":13,\\"chosenAnswerId\\":17},{\\"questionId\\":14,\\"chosenAnswerId\\":20},{\\"questionId\\":15,\\"chosenAnswerId\\":25}]"	2023-11-22 11:30:26.352633	1	8	1e689805-0ec0-4e86-aecd-7ed3e8e0a9dc
32	0f6ccfe0-c359-4c14-a02d-873cca9c7c0e	1	3	"[{\\"questionId\\":12,\\"chosenAnswerId\\":14},{\\"questionId\\":13,\\"chosenAnswerId\\":19},{\\"questionId\\":13,\\"chosenAnswerId\\":18},{\\"questionId\\":13,\\"chosenAnswerId\\":17},{\\"questionId\\":14,\\"chosenAnswerId\\":22},{\\"questionId\\":14,\\"chosenAnswerId\\":23},{\\"questionId\\":15,\\"chosenAnswerId\\":27}]"	2023-11-24 13:02:53.989014	1	8	1e689805-0ec0-4e86-aecd-7ed3e8e0a9dc
33	1b7a1da0-fa09-4ec3-ac9c-81dd6f666cb6	1	2	"[{\\"questionId\\":12,\\"chosenAnswerId\\":14},{\\"questionId\\":13,\\"chosenAnswerId\\":17},{\\"questionId\\":14,\\"chosenAnswerId\\":21},{\\"questionId\\":15,\\"chosenAnswerId\\":27}]"	2023-11-24 13:04:53.014068	1	8	1e689805-0ec0-4e86-aecd-7ed3e8e0a9dc
34	6ee6cd88-6dc5-45ac-ac3e-572238b88219	1	2	"[{\\"questionId\\":12,\\"chosenAnswerId\\":15},{\\"questionId\\":13,\\"chosenAnswerId\\":19},{\\"questionId\\":14,\\"chosenAnswerId\\":21},{\\"questionId\\":15,\\"chosenAnswerId\\":27}]"	2023-11-24 13:05:48.17856	1	8	1e689805-0ec0-4e86-aecd-7ed3e8e0a9dc
35	b22cffd0-66ca-491f-8de1-37be4ff170d1	1	5	"[{\\"questionId\\":12,\\"chosenAnswerId\\":14},{\\"questionId\\":12,\\"chosenAnswerId\\":16},{\\"questionId\\":12,\\"chosenAnswerId\\":15},{\\"questionId\\":12,\\"chosenAnswerId\\":14},{\\"questionId\\":12,\\"chosenAnswerId\\":15},{\\"questionId\\":12,\\"chosenAnswerId\\":14},{\\"questionId\\":13,\\"chosenAnswerId\\":19},{\\"questionId\\":13,\\"chosenAnswerId\\":18},{\\"questionId\\":13,\\"chosenAnswerId\\":19},{\\"questionId\\":13,\\"chosenAnswerId\\":17},{\\"questionId\\":14,\\"chosenAnswerId\\":22},{\\"questionId\\":14,\\"chosenAnswerId\\":21},{\\"questionId\\":14,\\"chosenAnswerId\\":20},{\\"questionId\\":14,\\"chosenAnswerId\\":23},{\\"questionId\\":15,\\"chosenAnswerId\\":26},{\\"questionId\\":15,\\"chosenAnswerId\\":24},{\\"questionId\\":15,\\"chosenAnswerId\\":25},{\\"questionId\\":15,\\"chosenAnswerId\\":27}]"	2023-11-24 13:06:34.803552	1	8	1e689805-0ec0-4e86-aecd-7ed3e8e0a9dc
36	0747ff33-683a-4044-ae6f-e82fe8f3d694	1	3	"[{\\"questionId\\":12,\\"chosenAnswerId\\":16},{\\"questionId\\":13,\\"chosenAnswerId\\":17},{\\"questionId\\":14,\\"chosenAnswerId\\":23},{\\"questionId\\":15,\\"chosenAnswerId\\":27}]"	2023-11-24 13:10:56.761766	1	8	1e689805-0ec0-4e86-aecd-7ed3e8e0a9dc
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, uid, email, password, nickname, avatar) FROM stdin;
1	f61bb9e5-5e3e-4c88-85d3-0c44152e4d13	test@test.test	$2b$10$pjGpYhZcJ/Eyki2H7WcYFuzqnvlqCoN0lofg9kx.u0Onl6ZJCHxq.	test	\N
\.


--
-- Name: answer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.answer_id_seq', 28, true);


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_seq', 1, true);


--
-- Name: question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.question_id_seq', 16, true);


--
-- Name: quiz_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quiz_id_seq', 9, true);


--
-- Name: result_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.result_id_seq', 36, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 1, true);


--
-- Name: question PK_21e5786aa0ea704ae185a79b2d5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY (id);


--
-- Name: quiz PK_422d974e7217414e029b3e641d0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz
    ADD CONSTRAINT "PK_422d974e7217414e029b3e641d0" PRIMARY KEY (id);


--
-- Name: category_quizzes_quiz PK_710e2d35c80cb9f697794b61419; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category_quizzes_quiz
    ADD CONSTRAINT "PK_710e2d35c80cb9f697794b61419" PRIMARY KEY ("categoryId", "quizId");


--
-- Name: answer PK_9232db17b63fb1e94f97e5c224f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answer
    ADD CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY (id);


--
-- Name: quiz_categories_category PK_984e4e72ca0ef4afa0c82d3ad03; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_categories_category
    ADD CONSTRAINT "PK_984e4e72ca0ef4afa0c82d3ad03" PRIMARY KEY ("quizId", "categoryId");


--
-- Name: category PK_9c4e4a89e3674fc9f382d733f03; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY (id);


--
-- Name: result PK_c93b145f3c2e95f6d9e21d188e2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.result
    ADD CONSTRAINT "PK_c93b145f3c2e95f6d9e21d188e2" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: quiz UQ_11c9b04c22213d8f6d3ae456663; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz
    ADD CONSTRAINT "UQ_11c9b04c22213d8f6d3ae456663" UNIQUE (uid);


--
-- Name: result UQ_df71046dae81d2b4c3b69c1552c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.result
    ADD CONSTRAINT "UQ_df71046dae81d2b4c3b69c1552c" UNIQUE (uid);


--
-- Name: user UQ_df955cae05f17b2bcf5045cc021; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_df955cae05f17b2bcf5045cc021" UNIQUE (uid);


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: IDX_5a4caaee49d0c9194b5547c6d6; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_5a4caaee49d0c9194b5547c6d6" ON public.category_quizzes_quiz USING btree ("quizId");


--
-- Name: IDX_6b3a24694fcc04c76848a5019c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_6b3a24694fcc04c76848a5019c" ON public.quiz_categories_category USING btree ("quizId");


--
-- Name: IDX_96be84296fad52be2847551922; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_96be84296fad52be2847551922" ON public.category_quizzes_quiz USING btree ("categoryId");


--
-- Name: IDX_d0c738f7267cc17b1d2bd0cdfc; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_d0c738f7267cc17b1d2bd0cdfc" ON public.quiz_categories_category USING btree ("categoryId");


--
-- Name: question FK_4959a4225f25d923111e54c7cd2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT "FK_4959a4225f25d923111e54c7cd2" FOREIGN KEY ("quizId") REFERENCES public.quiz(id) ON DELETE CASCADE;


--
-- Name: quiz FK_52c158a608620611799fd63a927; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz
    ADD CONSTRAINT "FK_52c158a608620611799fd63a927" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: category_quizzes_quiz FK_5a4caaee49d0c9194b5547c6d6c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category_quizzes_quiz
    ADD CONSTRAINT "FK_5a4caaee49d0c9194b5547c6d6c" FOREIGN KEY ("quizId") REFERENCES public.quiz(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: result FK_5aa232ac54c9ddbef33f2e7c55e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.result
    ADD CONSTRAINT "FK_5aa232ac54c9ddbef33f2e7c55e" FOREIGN KEY ("authorId") REFERENCES public."user"(id);


--
-- Name: quiz_categories_category FK_6b3a24694fcc04c76848a5019c1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_categories_category
    ADD CONSTRAINT "FK_6b3a24694fcc04c76848a5019c1" FOREIGN KEY ("quizId") REFERENCES public.quiz(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: category_quizzes_quiz FK_96be84296fad52be28475519229; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category_quizzes_quiz
    ADD CONSTRAINT "FK_96be84296fad52be28475519229" FOREIGN KEY ("categoryId") REFERENCES public.category(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: answer FK_a4013f10cd6924793fbd5f0d637; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answer
    ADD CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637" FOREIGN KEY ("questionId") REFERENCES public.question(id) ON DELETE CASCADE;


--
-- Name: quiz_categories_category FK_d0c738f7267cc17b1d2bd0cdfca; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_categories_category
    ADD CONSTRAINT "FK_d0c738f7267cc17b1d2bd0cdfca" FOREIGN KEY ("categoryId") REFERENCES public.category(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: result FK_ee18239cf6832f54ad345bb87e1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.result
    ADD CONSTRAINT "FK_ee18239cf6832f54ad345bb87e1" FOREIGN KEY ("quizId") REFERENCES public.quiz(id);


--
-- PostgreSQL database dump complete
--

