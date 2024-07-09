import { setupWorker, rest } from "msw";

export const handlers = [
  rest.get("/mystudy", (req, res, ctx) => {
    console.log("");
    return res(
      ctx.status(200),
      ctx.json({
        studyList: [
          {
            studyPk: 1,
            studyName: "자바보라능",
            studyImg: "/img/sample-img-1.png",
            studyPersonNum: 4,
            maxPeople: 5,
            studyStartDate: "2023-01-01",
            studyEndDate: "2023-12-31",
          },
          {
            studyPk: 2,
            studyName: "네트워King",
            studyImg: "/img/sample-img-2.png",
            studyPersonNum: 4,
            studyStartDate: "2023-01-01",
            studyEndDate: "2023-12-31",
          },
        ],
      })
    );
  }),
  rest.get("/mystudy/admin", (req, res, ctx) => {
    console.log("");
    return res(
      ctx.status(200),
      ctx.json({
        studyList: [
          {
            studyPk: 3,
            studyName: "빌런저장소",
            studyImg: "/img/sample-img-1.png",
            studyPersonNum: 4,
            studyStartDate: "2023-01-01",
            studyEndDate: "2023-12-31",
          },
          {
            studyPk: 4,
            studyName: "아마zone",
            studyImg: "/img/sample-img-2.png",
            studyPersonNum: 4,
            studyStartDate: "2023-01-01",
            studyEndDate: "2023-12-31",
          },
          {
            studyPk: 5,
            studyName: "자율스터디",
            studyImg: "/img/sample-img-3.jpg",
            studyPersonNum: 4,
            studyStartDate: "2023-01-01",
            studyEndDate: "2023-12-31",
          },
          {
            studyPk: 4,
            studyName: "자율스터디",
            studyImg: "/img/study-img-sample.png",
            studyPersonNum: 4,
            studyStartDate: "2023-01-01",
            studyEndDate: "2023-12-31",
          },
        ],
      })
    );
  }),

  rest.get("/mystudy/apply/:studyPk", (req, res, ctx) => {
    const { studyPk } = req.params;
    console.log(`studyPk: ${studyPk}에 대한 지원 목록을 가져옵니다.`);

    // studyPk별로 다른 데이터를 반환하는 조건문 추가
    let enterStudyList = {
      3: [
        {
          userId: 3333,
          nickname: "제로님이시다",
          profileURL: "/img/default-profile.png",
          content: "도전장이다...",
        },
        {
          userId: 3334,
          nickname: "바질아범",
          profileURL: "/img/default-profile.png",
          content: "지원합니다!",
        },
        {
          userId: 3339,
          nickname: "할수있수연",
          profileURL: "/img/default-profile.png",
          content:
            "나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 ",
        },
      ],
      4: [
        {
          userId: 3335,
          nickname: "zxcv",
          profileURL: "/img/default-profile.png",
          content: "저도 참여하고 싶어요!",
        },
      ],
    };
    enterStudyList = enterStudyList[studyPk] || [];

    return res(
      ctx.status(200),
      ctx.json({
        enterStudyList: enterStudyList,
      })
    );
  }),

  rest.get("/users/mypage", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        nickname: "제로다냥",
      })
    );
  }),

  rest.get("/board", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          studyBoardPk: 1,
          studyPk: 1,
          studyName: "빌런저장소",
          adTitle: "빌런저장소입니다",
          adContent:
            "알고리즘 골드 이상까지 풀어 보실분! Java로 하시는 분 모집합니다! 활발한 분위기고 출석체크 엄격하게 합니다! 스터디 운영 여러개 해봤습니다! 다들 지원해주세요!",
          studyImg: "/img/sample-img-1.png",
          studyPersonNum: 4,
          studyStartDate: "2023-01-01",
          studyEndDate: "2023-12-31",
          modifyDate: "2023-02-23",
        },
        {
          studyBoardPk: 2,
          studyPk: 2,
          studyName: "아마zone",
          adTitle: "아마존에 간 건 아마...존?",
          adContent:
            "아마존에 간 존에 대해 이야기하는 스터디입니다...",
          studyImg: "/img/sample-img-2.png",
          studyPersonNum: 4,
          studyStartDate: "2023-01-01",
          studyEndDate: "2023-12-31",
          modifyDate: "2023-02-23",
        },
        {
          studyBoardPk: 3,
          studyPk: 3,
          studyName: "우아한 스터디",
          adTitle: "우아한 스터디 모집합니다.",
          adContent:
            "우아한 스터디 모집중",
          studyImg: "/img/sample-img-3.jpg",
          studyPersonNum: 4,
          studyStartDate: "2023-01-01",
          studyEndDate: "2023-12-31",
          modifyDate: "2023-02-23",
        },
        {
          studyBoardPk: 4,
          studyPk: 4,
          studyName: "빌런저장소",
          adTitle: "빌런저장소입니다",
          adContent:
            "알고리즘 골드 이상까지 풀어 보실분! Java로 하시는 분 모집합니다! 활발한 분위기고 출석체크 엄격하게 합니다! 스터디 운영 여러개 해봤습니다! 다들 지원해주세요!",
          studyImg: "/img/sample-img-1.png",
          studyPersonNum: 4,
          studyStartDate: "2023-01-01",
          studyEndDate: "2023-12-31",
          modifyDate: "2023-02-23",
        },
        {
          studyBoardPk: 5,
          studyPk: 5,
          studyName: "아마zone",
          adTitle: "아마존에 간 건 아마...존?",
          adContent:
            "아마존에 간 존에 대해 이야기하는 스터디입니다... 나이, 성별 제한 없습니다... 아무나 오세요... 환영합니다... 칼수락 합니다...",
          studyImg: "/img/sample-img-2.png",
          studyPersonNum: 4,
          studyStartDate: "2023-01-01",
          studyEndDate: "2023-12-31",
          modifyDate: "2023-02-23",
        },
        {
          studyBoardPk: 6,
          studyPk: 6,
          studyName: "우아한 스터디",
          adTitle: "우아한 스터디 모집합니다.",
          adContent:
            "우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다!",
          studyImg: "/img/sample-img-3.jpg",
          studyPersonNum: 4,
          studyStartDate: "2023-01-01",
          studyEndDate: "2023-12-31",
          modifyDate: "2023-02-23",
        },
        {
          studyBoardPk: 7,
          studyPk: 7,
          studyName: "빌런저장소",
          adTitle: "빌런저장소입니다",
          adContent:
            "알고리즘 골드 이상까지 풀어 보실분! Java로 하시는 분 모집합니다! 활발한 분위기고 출석체크 엄격하게 합니다! 스터디 운영 여러개 해봤습니다! 다들 지원해주세요!",
          studyImg: "/img/sample-img-1.png",
          studyPersonNum: 4,
          studyStartDate: "2023-01-01",
          studyEndDate: "2023-12-31",
          modifyDate: "2023-02-23",
        },
        {
          studyBoardPk: 8,
          studyPk: 8,
          studyName: "아마zone",
          adTitle: "아마존에 간 건 아마...존?",
          adContent:
            "아마존에 간 존에 대해 이야기하는 스터디입니다... 나이, 성별 제한 없습니다... 아무나 오세요... 환영합니다... 칼수락 합니다...",
          studyImg: "/img/sample-img-2.png",
          studyPersonNum: 4,
          studyStartDate: "2023-01-01",
          studyEndDate: "2023-12-31",
          modifyDate: "2023-02-23",
        },
        {
          studyBoardPk: 9,
          studyPk: 9,
          studyName: "우아한 스터디",
          adTitle: "우아한 스터디 모집합니다.",
          adContent:
            "우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다!",
          studyImg: "/img/sample-img-3.jpg",
          studyPersonNum: 4,
          studyStartDate: "2023-01-01",
          studyEndDate: "2023-12-31",
          modifyDate: "2023-02-23",
        },
        {
          studyBoardPk: 10,
          studyPk: 10,
          studyName: "빌런저장소",
          adTitle: "빌런저장소입니다",
          adContent:
            "알고리즘 골드 이상까지 풀어 보실분! Java로 하시는 분 모집합니다! 활발한 분위기고 출석체크 엄격하게 합니다! 스터디 운영 여러개 해봤습니다! 다들 지원해주세요!",
          studyImg: "/img/sample-img-1.png",
          studyPersonNum: 4,
          studyStartDate: "2023-01-01",
          studyEndDate: "2023-12-31",
          modifyDate: "2023-02-23",
        },
        {
          studyBoardPk: 11,
          studyPk: 11,
          studyName: "아마zone",
          adTitle: "아마존에 간 건 아마...존?",
          adContent:
            "아마존에 간 존에 대해 이야기하는 스터디입니다... 나이, 성별 제한 없습니다... 아무나 오세요... 환영합니다... 칼수락 합니다...",
          studyImg: "/img/sample-img-2.png",
          studyPersonNum: 4,
          studyStartDate: "2023-01-01",
          studyEndDate: "2023-12-31",
          modifyDate: "2023-02-23",
        },
        {
          studyBoardPk: 12,
          studyPk: 12,
          studyName: "우아한 스터디",
          adTitle: "우아한 스터디 모집합니다.",
          adContent:
            "우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다!",
          studyImg: "/img/sample-img-3.jpg",
          studyPersonNum: 4,
          studyStartDate: "2023-01-01",
          studyEndDate: "2023-12-31",
          modifyDate: "2023-02-23",
        },
        {
          studyBoardPk: 13,
          studyPk: 13,
          studyName: "빌런저장소",
          adTitle: "빌런저장소입니다",
          adContent:
            "알고리즘 골드 이상까지 풀어 보실분! Java로 하시는 분 모집합니다! 활발한 분위기고 출석체크 엄격하게 합니다! 스터디 운영 여러개 해봤습니다! 다들 지원해주세요!",
          studyImg: "/img/sample-img-1.png",
          studyPersonNum: 4,
          studyStartDate: "2023-01-01",
          studyEndDate: "2023-12-31",
          modifyDate: "2023-02-23",
        },
        {
          studyBoardPk: 14,
          studyPk: 14,
          studyName: "아마zone",
          adTitle: "아마존에 간 건 아마...존?",
          adContent:
            "아마존에 간 존에 대해 이야기하는 스터디입니다... 나이, 성별 제한 없습니다... 아무나 오세요... 환영합니다... 칼수락 합니다...",
          studyImg: "/img/sample-img-2.png",
          studyPersonNum: 4,
          studyStartDate: "2023-01-01",
          studyEndDate: "2023-12-31",
          modifyDate: "2023-02-23",
        },
        {
          studyBoardPk: 15,
          studyPk: 15,
          studyName: "우아한 스터디",
          adTitle: "우아한 스터디 모집합니다.",
          adContent:
            "우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다!",
          studyImg: "/img/sample-img-3.jpg",
          studyPersonNum: 4,
          studyStartDate: "2023-01-01",
          studyEndDate: "2023-12-31",
          modifyDate: "2023-02-23",
        },
      ])
    );
  }),

  rest.get("/board/:studyBoardPk", (req, res, ctx) => {
    const { studyBoardPk } = req.params; // req.params를 통해 URL에서 studyBoardPk 값을 얻음

    // 사전에 정의된 스터디 정보 객체
    const boardData = {
      1: {
        studyBoardPk: 1,
        studyPk: 1,
        studyName: "빌런저장소",
        adTitle: "빌런저장소입니다",
        adContent:
          "알고리즘 골드 이상까지 풀어 보실분! Java로 하시는 분 모집합니다! 활발한 분위기고 출석체크 엄격하게 합니다! 스터디 운영 여러개 해봤습니다! 다들 지원해주세요!",
        studyImg: "/img/sample-img-1.png",
        studyPersonNum: 4,
        studyStartDate: "2023-01-01",
        studyEndDate: "2023-12-31",
        modifyDate: "2023-02-23",
      },
      2: {
        studyBoardPk: 2,
        studyPk: 2,
        studyName: "아마zone",
        adTitle: "아마존에 간 건 아마...존?",
        adContent:
          "아마존에 간 존에 대해 이야기하는 스터디입니다... 나이, 성별 제한 없습니다... 아무나 오세요... 환영합니다... 칼수락 합니다...",
        studyImg: "/img/sample-img-2.png",
        studyPersonNum: 4,
        studyStartDate: "2023-01-01",
        studyEndDate: "2023-12-31",
        modifyDate: "2023-02-23",
      },
      3: {
        studyBoardPk: 3,
        studyPk: 3,
        studyName: "우아한 스터디",
        adTitle: "우아한 스터디 모집합니다.",
        adContent:
          "우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다!",
        studyImg: "/img/sample-img-3.jpg",
        studyPersonNum: 4,
        studyStartDate: "2023-01-01",
        studyEndDate: "2023-12-31",
        modifyDate: "2023-02-23",
      },
      3: {
        studyBoardPk: 4,
        studyPk: 4,
        studyName: "우아한 스터디",
        adTitle: "우아한 스터디 모집합니다.",
        adContent:
          "우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다!",
        studyImg: "/img/sample-img-3.jpg",
        studyPersonNum: 4,
        studyStartDate: "2023-01-01",
        studyEndDate: "2023-12-31",
        modifyDate: "2023-02-23",
      },
    };

    const study = boardData[studyBoardPk];

    if (study) {
      return res(ctx.status(200), ctx.json(study));
    } else {
      return res(
        ctx.status(404),
        ctx.json({ error: "해당 스터디가 없습니다." })
      );
    }
  }),

  rest.get("/study/:studyPk", (req, res, ctx) => {
    const { studyPk } = req.params;
    const study = {
      1: {
        studyPk: 1,
        studyName: "자바보라능",
      },
    }
    const studyDetails = study[studyPk];
    if (studyDetails) {
      return res(ctx.status(200), ctx.json(studyDetails));
    } else {
      return res(ctx.status(404), ctx.json({ error: "Study not found" }));
    }
  }),

  rest.get("/study/:studyPk/management", (req, res, ctx) => {
    const { studyPk } = req.params;
    const study = {
      1: {
        studyPk: 1,
        studyName: "자바보라능",
        memberPk: 0,
        content: "헬로우다",
        imageUri: "/img/sample-img-1.png",
        studyPersonNum: 4,
        maxPeople: 4,
        startDate: "2024-01-01",
        closeDate: "2024-11-18",
        adTitle: "자바 알고리즘 스터디",
        adContent: "알고리즘 골드 이상까지 풀어 보실분! Java로 하시는 분 모집합니다! 활발한 분위기고 출석체크 엄격하게 합니다! 스터디 운영 여러개 해봤습니다! 다들 지원해주세요!",
        
      },
      2: {
        studyPk: 2,
        studyName: "자바보라능",
        memberPk: 0,
        content: "헬로우",
        imageUri: "/img/sample-img-1.png",
        studyPersonNum: 4,
        maxPeople: 6,
        startDate: "2023-01-01",
        closeDate: "2023-12-31",
      },
      3: {
        studyPk: 2,
        studyName: "자바보라능",
        memberPk: 0,
        content: "헬로우",
        imageUri: "/img/sample-img-1.png",
        studyPersonNum: 4,
        maxPeople: 6,
        startDate: "2023-01-01",
        closeDate: "2023-12-31",
      },
      4: {
        studyPk: 3,
        studyName: "자바보라능",
        memberPk: 0,
        content: "헬로우",
        imageUri: "/img/sample-img-1.png",
        studyPersonNum: 4,
        maxPeople: 6,
        startDate: "2023-01-01",
        closeDate: "2023-12-31",
      },
      5: {
        studyPk: 4,
        studyName: "자바보라능",
        memberPk: 0,
        content: "헬로우",
        imageUri: "/img/sample-img-1.png",
        studyPersonNum: 4,
        maxPeople: 6,
        startDate: "2023-01-01",
        closeDate: "2023-12-31",
      },
    };

    const studyDetails = study[studyPk];
    if (studyDetails) {
      return res(ctx.status(200), ctx.json(studyDetails));
    } else {
      return res(ctx.status(404), ctx.json({ error: "Study not found" }));
    }
  }),

  rest.get("/study/:studyPk/management/board", (req, res, ctx) => {
    const { studyPk } = req.params;
    const study = {
      1:  {             
        "studyBoardPk": 3004,
        "adTitle": "홍보 제목", 
         "adContent": "홍보 내용",
         "imageUri": "/img/sample-img-1.png"  
 }

    };

    const studyDetails = study[studyPk];
    if (studyDetails) {
      return res(ctx.status(200), ctx.json(studyDetails));
    } else {
      return res(ctx.status(404), ctx.json({ error: "Study not found" }));
    }
  }),

  rest.post('/study/:studyPk/management', (req, res, ctx) => {
    const { studyPk } = req.params;
    const { content, imageUri, maxPeople, closeDate } = req.body;

    return res(
        ctx.status(200),
        ctx.json({
            studyPk,
            content,
            imageUri,
            maxPeople,
            closeDate
        })
    );
}),

  // 스터디 멤버 정보 가져오기
  rest.get("/study/:studyPk/management/members", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          memberPk: 1,
          nickname: "서다영",
          imgURL: "/img/member-img-sample.png",
        },
        {
          memberPk: 2,
          nickname: "이수지",
          imgURL: "/img/member-img-sample.png",
        },
      ])
    );
  }),

  // 스터디 정보 수정
  rest.post("/study/:studyPk/management", (req, res, ctx) => {
    const { studyPk } = req.params;
    const { content, imageUri, maxPeople, closeDate } = req.body;

    return res(
      ctx.status(200),
      ctx.json({
        studyPk,
        content,
        maxPeople,
        closeDate,
      })
    );
  }),

  rest.delete("/study/:studyPk/management/expel", (req, res, ctx) => {
    const { studyPk } = req.params;
    const { memberPk } = req.body;  // 요청 본문에서 memberPk 추출

    // 올바른 멤버 PK가 제공되었다고 가정하고, 성공 메시지를 반환
    if (memberPk) {
      return res(
        ctx.status(200),
        ctx.json({
          message: "Member has been expelled successfully.",
          studyPk: studyPk,
          memberPk: memberPk
        })
      );
    }

    // 멤버 PK가 제공되지 않았다면 에러 메시지 반환
    return res(
      ctx.status(400),
      ctx.json({
        error: "Member PK is missing in the request."
      })
    );
  }),

  rest.get('https://smore.today/subscribe/notification', (req, res, ctx) => {
    // EventSource는 기본적으로 msw에서 직접 지원하지 않으므로, 여기서는 REST API를 예시로 사용합니다.
    // 실제 EventSource 테스트는 다른 방식으로 구현해야 할 수 있습니다.
    return res(
      ctx.status(200),
      ctx.json({
        notificationPk: "0fe8b947-b22e-47d9-ad1c-7f1c8b15172",
        studyPk: "12312421321312",
        receiverPk: 123214124215,
        content: "스터디 가입 신청 요청이 있습니다."
      })
    );
  }),
];
