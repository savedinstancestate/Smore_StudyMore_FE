import { rest } from 'msw';

export const handlers = [
  rest.get('', (req, res, ctx) => {
    console.log('');
    return res(
      ctx.status(200),
      ctx.json({
        "studyList": [
            
            // 더 많은 스터디 데이터..
        ]
      })
    );
  }),
  rest.get('', (req, res, ctx) => {
    console.log('');
    return res(
      ctx.status(200),
      ctx.json({
        "studyList": [
            {
                "studyPk": 1,
                "studyName": "스터디 이름",
                "studyImg": "img/study-img-sample.png",
                "studyPersonNum": 4,
                "studyStartDate": "2023-01-01",
                "studyEndDate": "2023-12-31"
            },
            {
              "studyPk": 2,
              "studyName": "스터디 이름2",
              "studyImg": "img/study-img-sample.png",
              "studyPersonNum": 4,
              "studyStartDate": "2023-01-01",
              "studyEndDate": "2023-12-31"
          },
          {
            "studyPk": 3,
            "studyName": "스터디 이름3",
            "studyImg": "img/study-img-sample.png",
            "studyPersonNum": 4,
            "studyStartDate": "2023-01-01",
            "studyEndDate": "2023-12-31"
        }
        ]
      })
    );
  }),

  rest.get('', (req, res, ctx) => {
    const { studyPk } = req.params;  // 요청 파라미터에서 studyPk 추출
  console.log(`studyPk: ${studyPk}에 대한 지원 목록을 가져옵니다.`);
    return res(
      ctx.status(200),
      ctx.json({
        "enterStudyList": [
            {
                "userId" : 3333,
                "nickname": "asdf",
                "profileURL": "img/study-img-sample.png",
                "content": "도전장이다...",
            },
        ]
      })
    );
  })
];
