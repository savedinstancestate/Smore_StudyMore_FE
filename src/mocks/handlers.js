import { rest } from 'msw';

export const handlers = [
  rest.get('/study', (req, res, ctx) => {
    console.log('');
    return res(
      ctx.status(200),
      ctx.json({
        "studyList": [
          {
            "studyPk": 1,
            "studyName": "스터디 이름",
            "studyImg": "/img/study-img-sample.png",
            "studyPersonNum": 4,
            "studyStartDate": "2023-01-01",
            "studyEndDate": "2023-12-31"
        },
            // 더 많은 스터디 데이터..
        ]
      })
    );
  }),
  rest.get('/study/admin', (req, res, ctx) => {
    console.log('');
    return res(
      ctx.status(200),
      ctx.json({
        "studyList": [
            {
                "studyPk": 1,
                "studyName": "스터디 이름",
                "studyImg": "/img/study-img-sample.png",
                "studyPersonNum": 4,
                "studyStartDate": "2023-01-01",
                "studyEndDate": "2023-12-31"
            },
            {
              "studyPk": 2,
              "studyName": "스터디 이름2",
              "studyImg": "/img/study-img-sample.png",
              "studyPersonNum": 4,
              "studyStartDate": "2023-01-01",
              "studyEndDate": "2023-12-31"
          },
          {
            "studyPk": 3,
            "studyName": "스터디 이름3",
            "studyImg": "/img/study-img-sample.png",
            "studyPersonNum": 4,
            "studyStartDate": "2023-01-01",
            "studyEndDate": "2023-12-31"
        }
        ]
      })
    );
  }),

  rest.get('/study/apply/:studyPk', (req, res, ctx) => {
    const { studyPk } = req.params;
    console.log(`studyPk: ${studyPk}에 대한 지원 목록을 가져옵니다.`);
    
    // studyPk별로 다른 데이터를 반환하는 조건문 추가
    let enterStudyList;
    if (studyPk === "1") {
      enterStudyList = [
        {
          "userId": 3333,
          "nickname": "제로님이시다",
          "profileURL": "/img/default-profile.png",
          "content": "도전장이다...",
        },
        {
          "userId": 3334,
          "nickname": "바질아범",
          "profileURL": "/img/default-profile.png",
          "content": "지원합니다!",
        },
        {
          "userId": 3339,
          "nickname": "할수있수연",
          "profileURL": "/img/default-profile.png",
          "content": "나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 ",
        }
      ];
    } else if (studyPk === "2") {
      enterStudyList = [
        {
          "userId": 3335,
          "nickname": "zxcv",
          "profileURL": "/img/default-profile.png",
          "content": "저도 참여하고 싶어요!",
        }
      ];
    } else {
      enterStudyList = [];  // studyPk가 다른 경우 빈 배열 반환
    }

    return res(
      ctx.status(200),
      ctx.json({
        "enterStudyList": enterStudyList
      })
    );
  }),

  rest.get('/users/mypage', (req, res, ctx) => {
    console.log('');
    return res(
      ctx.status(200),
      ctx.json({
            "nickname": "제로다냥",
      })
    );
  }),
];
