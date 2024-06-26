import { rest } from 'msw';

export const handlers = [
  rest.get('/mystudy', (req, res, ctx) => {
    console.log('');
    return res(
      ctx.status(200),
      ctx.json({
        "studyList": [
          {
            "studyPk": 1,
            "studyName": "자바보라능",
            "studyImg": "/img/sample-img-1.png",
            "studyPersonNum": 4,
            "studyStartDate": "2023-01-01",
            "studyEndDate": "2023-12-31"
        },
            // 더 많은 스터디 데이터..
        ]
      })
    );
  }),
  rest.get('/mystudy/admin', (req, res, ctx) => {
    console.log('');
    return res(
      ctx.status(200),
      ctx.json({
        "studyList": [
            {
                "studyPk": 1,
                "studyName": "빌런저장소",
                "studyImg": "/img/sample-img-1.png",
                "studyPersonNum": 4,
                "studyStartDate": "2023-01-01",
                "studyEndDate": "2023-12-31"
            },
            {
              "studyPk": 2,
              "studyName": "아마존에 간 건 아마...존?",
              "studyImg": "/img/sample-img-2.png",
              "studyPersonNum": 4,
              "studyStartDate": "2023-01-01",
              "studyEndDate": "2023-12-31"
          },
          {
            "studyPk": 3,
            "studyName": "자율스터디",
            "studyImg": "/img/sample-img-3.jpg",
            "studyPersonNum": 4,
            "studyStartDate": "2023-01-01",
            "studyEndDate": "2023-12-31"
        },
        {
          "studyPk": 3,
          "studyName": "자율스터디",
          "studyImg": "/img/study-img-sample.png",
          "studyPersonNum": 4,
          "studyStartDate": "2023-01-01",
          "studyEndDate": "2023-12-31"
      }
        ]
      })
    );
  }),

  rest.get('/mystudy/apply/:studyPk', (req, res, ctx) => {
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

  rest.get('/board', (req, res, ctx) => { // 이름, 내용, 사진, 일정, 인원
    console.log('');
    return res(
      ctx.status(200),
      ctx.json({
        "boardList": [
            {
                "studyBoardPk": 1,
                "studyPk": 1,
                "studyName": "빌런저장소",
                "adTitle": "빌런저장소입니다",
                "adContent": "알고리즘 골드 이상까지 풀어 보실분! Java로 하시는 분 모집합니다! 활발한 분위기고 출석체크 엄격하게 합니다! 스터디 운영 여러개 해봤습니다! 다들 지원해주세요!",
                "studyImg": "/img/sample-img-1.png",
                "studyPersonNum": 4,
                "studyStartDate": "2023-01-01",
                "studyEndDate": "2023-12-31",
                "modifyDate": "2023-02-23",
            },
            {
              "studyBoardPk": 2,
              "studyPk": 2,
              "studyName": "아마zone",
              "adTitle": "아마존에 간 건 아마...존?",
              "adContent": "아마존에 간 존에 대해 이야기하는 스터디입니다... 나이, 성별 제한 없습니다... 아무나 오세요... 환영합니다... 칼수락 합니다...",
              "studyImg": "/img/sample-img-2.png",
              "studyPersonNum": 4,
              "studyStartDate": "2023-01-01",
              "studyEndDate": "2023-12-31",
              "modifyDate": "2023-02-23",
          },
          {
            "studyBoardPk": 3,
            "studyPk": 3,
            "studyName": "우아한 스터디",
            "adTitle": "우아한 스터디 모집합니다.",
            "adContent": "우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다!",
            "studyImg": "/img/sample-img-3.jpg",
            "studyPersonNum": 4,
            "studyStartDate": "2023-01-01",
            "studyEndDate": "2023-12-31",
            "modifyDate": "2023-02-23",
        },
        
        ]
      })
    );
  }),
  // MSW handler for specific study details based on studyBoardPk
rest.get('/board/:studyBoardPk', (req, res, ctx) => {
  const { studyBoardPk } = req.params; // req.params를 통해 URL에서 studyBoardPk 값을 얻음
  const boardList = [
      {
          "studyBoardPk": 1,
          "studyPk": 1,
          "adTitle": "빌런저장소입니다",
          "adContent": "알고리즘 골드 이상까지 풀어 보실분! Java로 하시는 분 모집합니다! 활발한 분위기고 출석체크 엄격하게 합니다! 스터디 운영 여러개 해봤습니다! 다들 지원해주세요!",
          "studyImg": "/img/sample-img-1.png",
          "studyPersonNum": 4,
          "studyStartDate": "2023-01-01",
          "studyEndDate": "2023-12-31",
          "modifyDate": "2023-02-23",
      },
      {
          "studyBoardPk": 2,
          "studyPk": 2,
          "adTitle": "아마존에 간 건 아마...존?",
          "adContent": "아마존에 간 존에 대해 이야기하는 스터디입니다... 나이, 성별 제한 없습니다... 아무나 오세요... 환영합니다... 칼수락 합니다...",
          "studyImg": "/img/sample-img-2.png",
          "studyPersonNum": 4,
          "studyStartDate": "2023-01-01",
          "studyEndDate": "2023-12-31",
          "modifyDate": "2023-02-23",
      },
      {
          "studyBoardPk": 3,
          "studyPk": 3,
          "adTitle": "우아한 스터디 모집합니다.",
          "adContent": "우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다!",
          "studyImg": "/img/sample-img-3.jpg",
          "studyPersonNum": 4,
          "studyStartDate": "2023-01-01",
          "studyEndDate": "2023-12-31",
          "modifyDate": "2023-02-23",
      }
  ];

  // 해당 studyBoardPk와 일치하는 객체 찾기
  const study = boardList.find(study => study.studyBoardPk.toString() === studyBoardPk);

  if (study) {
      return res(
          ctx.status(200),
          ctx.json(study)
      );
  } else {
      return res(
          ctx.status(404),
          ctx.json({ error: "해당 스터디가 없습니다." })
      );
  }
})

  
];
