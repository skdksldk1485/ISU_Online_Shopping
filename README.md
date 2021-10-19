## Project
E-commerce형태의 웹 서비스를 구현한 쇼핑몰 프로젝트입니다.<br />

>아래 링크에서 데모 확인이 가능합니다. <br />
https://isu-shopping.herokuapp.com/
<br />
<br />

#### 사용기술
- HTML5 / CSS3
- JavaScript(ES6+)
- React
- Redux, Redux-thunk
- MongoDB, Mongoose
- Node.js
- Express
- SCSS
- Gsap

#### 구현기능
- 회원가입/로그인/로그아웃
- 페이지네이션
- 상품 검색
- 카테고리 검색
- 제품 상세 페이지
- 상품 리뷰
- 주문 Checkout 프로세스
- 장바구니
- 페이팔/신용카드 결제기능
- 주문확인용 사용자 마이 페이지 , 프로필
- Admin 유저, 제품, 주문 관리 페이지
- 반응형 웹

<br />


### ⚡ 회원가입 & 로그인 & 로그아웃 
![Animation3](https://user-images.githubusercontent.com/29578054/132527200-79e9d9ab-87b8-4844-9b24-95adec8d65a3.gif)
<br />
**JWT 토큰**를 이용하여 브라우저 저장소(LocalStorage)에 전달하여 <br />
토큰을 생성하고 비워주는 방식으로 로그아웃 기능을 구현하였고,<br />
**Auth 미들웨어**를 통해 토큰을 비교하고<br />
사용자(User)가 관리자(Admin)인지 확인할 수 있는 로그인기능을 구현하였습니다.<br />

### ⚡ 랜딩페이지
![Animation1_2](https://user-images.githubusercontent.com/29578054/132527579-a74cdac8-8119-415c-b5f5-63ba5e510064.gif)
<br />
**GSAP**을 이용하여 스크롤 애니메이션을 구현하였고, <br />
Landing page의 ENTER를 누르면 제품리스트 페이지로 이동할 수 있습니다.

<br />

### ⚡ 제품리스트
![Animation2](https://user-images.githubusercontent.com/29578054/132527817-2e48c854-ff81-4d96-953d-8e9d3cab56b7.gif)
<br />
**카테고리 필터**와 **페이지네이션** 기능을 구현하여, 카테고리별로 상품 검색을 할 수 있습니다.

<br />

### ⚡ 제품 상세페이지 & 리뷰
![Animation4](https://user-images.githubusercontent.com/29578054/132527893-8b901271-30a1-4cf4-aa56-5903b4de5b07.gif)
<br />
제품 상세페이지에서는 **재고확인 & 상품 리뷰 & 장바구니 기능**을 구현하였습니다.

<br />

### ⚡ 검색기능
![Animation5](https://user-images.githubusercontent.com/29578054/132528184-6c508b02-0f87-46f8-ad35-cfc5c7f9d680.gif)
<br />
상단의 돋보기 아이콘을 클릭하면, 검색이 가능한 페이지로 이동되고<br />
키워드를 입력하면 해당하는 제품을 검색할 수 있도록 구현하였습니다.

<br />

### ⚡ 장바구니
![Animation6](https://user-images.githubusercontent.com/29578054/132528290-5473d94a-3762-406e-85a1-4d9fad718348.gif)
<br />
제품 상세페이지에서 마음에 드는 상품에 대해서 **장바구니 추가**가 가능하며, <br />
**장바구니 페이지에서 삭제와 수량 변경, 주문** 등의 기능이 가능합니다.

<br />

### ⚡ 주문
![Animation_1](https://user-images.githubusercontent.com/29578054/133455801-e70f23ac-36ba-4496-a15f-43b661652787.gif)
<br />
사용자가 장바구니에서 주문하기를 누르면 주문 페이지로 넘어가 <br />
배송지를 입력하고, 결제 방식을 선택, 주문 확인을 하면 결제 페이지로 이동하게 됩니다.

<br />

### ⚡ 결제
![Animation_2](https://user-images.githubusercontent.com/29578054/133455960-bb9d446c-b7c7-41ce-aa58-2232d6de4aff.gif)
<br />
**PayPal API**을 통해 결제 기능(페이팔 or 신용카드)을 구현하였습니다.

<br />

### ⚡ 프로필
![Animation_3](https://user-images.githubusercontent.com/29578054/133455999-546339f3-b1c6-4bc8-a2b3-0701002a6244.gif)
<br />
사용자는 프로필에서 **사용자 정보**와 **주문 정보**,  **배송 상태** 등을 확인할 수 있습니다.

<br />

### ⚡ 관리자 메뉴
![Animation11](https://user-images.githubusercontent.com/29578054/132530121-d31fe547-f1b8-4a1b-a94e-ffafd90f3ecf.gif)
<br />
관리자 페이지에서 사용자(Admin)는 **전체 유저의 목록확인, 유저 정보 수정, 삭제가 가능**하며<br />
**전체 제품 확인, 등록, 삭제, 수정** 할 수 있도록 각각 **CRUD 기능을 구현**하였습니다.<br />
주문 목록이 확인 가능하며, 배송이 완료되면 사용자(Admin)는 <br />
**배송완료를 클릭하여 유저에게 배송이 완료되었음을 알립니다.**

<br />

### ⚡ 반응형 웹
![캡처4](https://user-images.githubusercontent.com/29578054/133878855-6b8cee28-d014-4e00-889e-a49fc1b8355a.PNG)
<br />
![캡처5](https://user-images.githubusercontent.com/29578054/133878859-302bf080-b6e3-4bff-affe-7671a14ad9c6.PNG)
<br />
데스크탑, 아이패드, 모바일 각 화면에 맞춰서 반응형 웹을 구현하였습니다.

## 🌵 후기

이번 프로젝트를 진행하면서 백엔드를 경험해 볼 수 있었습니다.<br />
Node.js와 express, mongoDB를 사용해 서버와 데이터베이스를 구성하고 구현하는데 시간이 들었지만<br />
프론트엔드와 요청하고 받아오는 데이터가 어떤 흐름인지 이해하고<br />
어떻게 클라이언트 화면에 나타낼 수 있는지에 대해 더 깊은 이해를 할 수 있었던 경험이었습니다.<br />
이번 쇼핑몰 개발을 진행하면서<br />
RESTful-api에 대한 이해, Redux 를 이용한 상태관리, 토큰을 이용한 회원가입 / 로그인 / 로그아웃 구현, <br />
CSS전처리기(SCSS)를 이용하며 BEM을 따른 스타일링 등을 공부할 수 있었습니다.<br />
<br />
이번 기회를 통해서는 비동기 작업에 대해서는 Redux thunk가 필요하다는 것을 배울 수 있었으며,<br />
도중에 SCSS를 직접 다루는 과정에서 내가 원하는 디자인으로 변경해보고 싶었기에<br />
몇차례에 걸쳐 작업을 더 진행해봄으로써, <br />
SCSS을 통한 코드중복 및 변수를 활용한 유지보수의 편리함을 여러번 느낄 수 있었습니다.
<br />
<br />
<br />
<br />
