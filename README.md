# 원티드 프리온보딩 4주차 과제

## 1. 개요

본 페이지는 원티드 프리온보딩 인턴쉽 4주차 과제를 위한 리드미입니다.

## 2. 프로젝트 소개

제공된 JSON파일을 바탕으로 차트를 그리고 해당 그래프에 대한 정보를 확인할 수 있는 웹사이트입니다.

## 3. 배포 링크 및 사용 방법

### Install

```bash
npm install && npm start

# option
# --h (host)
# o (open)
```

### Deploy

[**🔗 배포링크**](https://pre-onboarding-12th-4-16-jm2dbo5ul-seunggukyoo.vercel.app/)

### Usage

- 값 확인 방법

  - 차트 값에 마우스가 가까워지면 해당 값과 지역의 이름이 표시됩니다.

   <img width="1082" alt="스크린샷 2023-09-13 오후 1 56 05" src="https://github.com/SeungGukYoo/pre-onboarding-12th-4-16/assets/119836116/83b35b4a-1588-43bc-93b2-492625d5b3d1">

- 특정 지역 필터링

  - 지역의 버튼을 클릭시 해당 지역의 막대 그래프는 색이 진해지며, 범위 그래프는 검은색 테두리가 감싸지게 됩니다.
  - 차트를 클릭하게 되면 해당 차트와 동일한 지역의 차트만 색이 진해지게 됩니다.

   <img width="1082" alt="스크린샷 2023-09-13 오후 1 56 21" src="https://github.com/SeungGukYoo/pre-onboarding-12th-4-16/assets/119836116/3ef3a1e0-8ece-4f92-b9ee-342fa5e7acdb">

- 하나의 차트만 확인

  - 차트는 위에 있는 "AREA Value" 혹은 "BAR Value"를 클릭시 "막대"형태의 차트와 "범위"형태 차트 중 한가지의 차트만 보여지게 됩니다.

   <img width="1082" alt="스크린샷 2023-09-13 오후 1 56 41" src="https://github.com/SeungGukYoo/pre-onboarding-12th-4-16/assets/119836116/2386e46c-7f62-4bb3-b885-0c92df65f25c">

## 4. 기술 소개

### Build Tools

<img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">

### Programming Languages & Libraries

<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white">

### CSS Framworks

<img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/postcss-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white">

### Code Quality & Formatting

<img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black">
<img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">

### Git hooks

<img src="https://img.shields.io/badge/husky-A5915F?style=for-the-badge&logo=&logoColor=white">

## 5. Best Practice

### 라이브러리 선택

- **[react-chart-js vs Recharts]**

  **react-chart-js**는 기존의 **chart.js**를 리액트에서 사용하기 위한 wrapper이다. 그렇기에 **chart.js**의 특징을 모두 갖고 있다.
  **chart.js**는 웹상에 그리는 것에 특화되어 있기 때문에 개발자가 디자인과 같은 부수적인 요소에 크게 신경쓰지 않아도 괜찮다

  **Recharts**는 **D3**를 리액트에서 기반에서 사용하기 위해 제작된 라이브러리로 웹상에 SVG를 바탕으로 다양한 커스터마이징과 디테일한 그래프를 사용자가 직접 만드는 것이 가능하기에 간편하게 수준 높은 그래프를 그리는 것이 가능하다.

  짧은 기간으로 인해 요구된 기능을 직접 기능을 구현해야하는 **Recharts**보다 러닝커브가 보다 낮고, 기본으로 제공되는 기능들이 내장된 **react-chart-js**를 선택하였습니다.

### **데이터 관리**

- **useState([ ]) vs useState({ })**

  제공된 JSON데이터를 의도에 맞게 state에 저장해야 하는데 생각해낸 방법은 2가지가 있다.

  1. 배열에 각각의 객체로 저장

  ```js
     [
        {
           "time_stamp":"14:32:00"
           "id": "성북구",
           "value_area": 46,
           "value_bar": 13111
        }
        ...
     ]
  ```

  2.  객체 속에 배열의 형태로 저장

  ```js
     {
         "id":["성북구",...],
         "time_stamp":["14:32:00",...],
         "value_area":[46,...],
         "value_bar":[13111,...],
     }
  ```

  1번 방법의 경우에는 각각의 데이터가 하나의 객체로 묶여있기 때문에 직관적이지만 반본적으로 값이 바뀌거나 단일 항목에 대해서 추가적인 작업이 필요하다면 그때는 효율적이지 않을 수 있습니다.

  2번의 방법의 경우에는 각각의 데이터가 요구하는 목적에 맞게 묶여있기 때문에 단일 항목에 대해서 작업하기 편하지만 각각의 인덱스가 모두 일치해야 하기 때문에 불확실성이 존재할 수 있습니다.

  1번과 2번의 각각의 장단점이 있었으며 보통 데이터를 관리하기 위해서는 평균적으로 1번의 방법을 사용하지만 이번 경우에는 정적인 데이터와 인덱스가 모두 일치하기 때문에 불확실한 상황이 존재할 확률이 없었기 때문에 2번의 방법도 괜찮은 방법이라고 생각하였습니다.

  그리고 색상 변경과 같은 이벤트가 자주 일어나기 때문에 단일 항목에 대한 수정이 빈번하게 일어날 것이라고 생각을 하였기에 2번 방법으로 진행해보았습니다.
