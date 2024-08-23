import { setupWorker, rest } from 'msw';

// const studyPk = 591138934038569899;

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
            studyPk: 6,
            studyName: "자율스터디",
            studyImg: "/img/sample-img-3.jpg",
            studyPersonNum: 4,
            studyStartDate: "2023-01-01",
            studyEndDate: "2023-12-31",
          },
        ],
      })
    );
  }),

    rest.get('/mystudy/apply/:studyPk', (req, res, ctx) => {
        const { studyPk } = req.params;
        console.log(`studyPk: ${studyPk}에 대한 지원 목록을 가져옵니다.`);

        // studyPk별로 다른 데이터를 반환하는 조건문 추가
        let enterStudyList = {
            3: [
                {
                    userId: 3333,
                    nickname: '제로님이시다',
                    profileURL: '/img/default-profile.png',
                    content: '도전장이다...',
                },
                {
                    userId: 3334,
                    nickname: '바질아범',
                    profileURL: '/img/default-profile.png',
                    content: '지원합니다!',
                },
                {
                    userId: 3339,
                    nickname: '할수있수연',
                    profileURL: '/img/default-profile.png',
                    content:
                        '나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 나를받아줘 ',
                },
            ],
            4: [
                {
                    userId: 3335,
                    nickname: 'zxcv',
                    profileURL: '/img/default-profile.png',
                    content: '저도 참여하고 싶어요!',
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

    rest.get('/users/mypage', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                nickname: '제로다냥',
            })
        );
    }),

    rest.get('/board', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                    studyBoardPk: 1,
                    studyPk: 1,
                    studyName: '빌런저장소',
                    adTitle: '빌런저장소입니다',
                    adContent:
                        '알고리즘 골드 이상까지 풀어 보실분! Java로 하시는 분 모집합니다! 활발한 분위기고 출석체크 엄격하게 합니다! 스터디 운영 여러개 해봤습니다! 다들 지원해주세요!',
                    studyImg: '/img/sample-img-1.png',
                    studyPersonNum: 4,
                    studyStartDate: '2023-01-01',
                    studyEndDate: '2023-12-31',
                    modifyDate: '2023-02-23',
                },
                {
                    studyBoardPk: 2,
                    studyPk: 2,
                    studyName: '아마zone',
                    adTitle: '아마존에 간 건 아마...존?',
                    adContent: '아마존에 간 존에 대해 이야기하는 스터디입니다...',
                    studyImg: '/img/sample-img-2.png',
                    studyPersonNum: 4,
                    studyStartDate: '2023-01-01',
                    studyEndDate: '2023-12-31',
                    modifyDate: '2023-02-23',
                },
                {
                    studyBoardPk: 3,
                    studyPk: 3,
                    studyName: '우아한 스터디',
                    adTitle: '우아한 스터디 모집합니다.',
                    adContent: '우아한 스터디 모집중',
                    studyImg: '/img/sample-img-3.jpg',
                    studyPersonNum: 4,
                    studyStartDate: '2023-01-01',
                    studyEndDate: '2023-12-31',
                    modifyDate: '2023-02-23',
                },
                {
                    studyBoardPk: 4,
                    studyPk: 4,
                    studyName: '빌런저장소',
                    adTitle: '빌런저장소입니다',
                    adContent:
                        '알고리즘 골드 이상까지 풀어 보실분! Java로 하시는 분 모집합니다! 활발한 분위기고 출석체크 엄격하게 합니다! 스터디 운영 여러개 해봤습니다! 다들 지원해주세요!',
                    studyImg: '/img/sample-img-1.png',
                    studyPersonNum: 4,
                    studyStartDate: '2023-01-01',
                    studyEndDate: '2023-12-31',
                    modifyDate: '2023-02-23',
                },
                {
                    studyBoardPk: 5,
                    studyPk: 5,
                    studyName: '아마zone',
                    adTitle: '아마존에 간 건 아마...존?',
                    adContent:
                        '아마존에 간 존에 대해 이야기하는 스터디입니다... 나이, 성별 제한 없습니다... 아무나 오세요... 환영합니다... 칼수락 합니다...',
                    studyImg: '/img/sample-img-2.png',
                    studyPersonNum: 4,
                    studyStartDate: '2023-01-01',
                    studyEndDate: '2023-12-31',
                    modifyDate: '2023-02-23',
                },
                {
                    studyBoardPk: 6,
                    studyPk: 6,
                    studyName: '우아한 스터디',
                    adTitle: '우아한 스터디 모집합니다.',
                    adContent:
                        '우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다!',
                    studyImg: '/img/sample-img-3.jpg',
                    studyPersonNum: 4,
                    studyStartDate: '2023-01-01',
                    studyEndDate: '2023-12-31',
                    modifyDate: '2023-02-23',
                },
                {
                    studyBoardPk: 7,
                    studyPk: 7,
                    studyName: '빌런저장소',
                    adTitle: '빌런저장소입니다',
                    adContent:
                        '알고리즘 골드 이상까지 풀어 보실분! Java로 하시는 분 모집합니다! 활발한 분위기고 출석체크 엄격하게 합니다! 스터디 운영 여러개 해봤습니다! 다들 지원해주세요!',
                    studyImg: '/img/sample-img-1.png',
                    studyPersonNum: 4,
                    studyStartDate: '2023-01-01',
                    studyEndDate: '2023-12-31',
                    modifyDate: '2023-02-23',
                },
                {
                    studyBoardPk: 8,
                    studyPk: 8,
                    studyName: '아마zone',
                    adTitle: '아마존에 간 건 아마...존?',
                    adContent:
                        '아마존에 간 존에 대해 이야기하는 스터디입니다... 나이, 성별 제한 없습니다... 아무나 오세요... 환영합니다... 칼수락 합니다...',
                    studyImg: '/img/sample-img-2.png',
                    studyPersonNum: 4,
                    studyStartDate: '2023-01-01',
                    studyEndDate: '2023-12-31',
                    modifyDate: '2023-02-23',
                },
                {
                    studyBoardPk: 9,
                    studyPk: 9,
                    studyName: '우아한 스터디',
                    adTitle: '우아한 스터디 모집합니다.',
                    adContent:
                        '우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다!',
                    studyImg: '/img/sample-img-3.jpg',
                    studyPersonNum: 4,
                    studyStartDate: '2023-01-01',
                    studyEndDate: '2023-12-31',
                    modifyDate: '2023-02-23',
                },
                {
                    studyBoardPk: 10,
                    studyPk: 10,
                    studyName: '빌런저장소',
                    adTitle: '빌런저장소입니다',
                    adContent:
                        '알고리즘 골드 이상까지 풀어 보실분! Java로 하시는 분 모집합니다! 활발한 분위기고 출석체크 엄격하게 합니다! 스터디 운영 여러개 해봤습니다! 다들 지원해주세요!',
                    studyImg: '/img/sample-img-1.png',
                    studyPersonNum: 4,
                    studyStartDate: '2023-01-01',
                    studyEndDate: '2023-12-31',
                    modifyDate: '2023-02-23',
                },
                {
                    studyBoardPk: 11,
                    studyPk: 11,
                    studyName: '아마zone',
                    adTitle: '아마존에 간 건 아마...존?',
                    adContent:
                        '아마존에 간 존에 대해 이야기하는 스터디입니다... 나이, 성별 제한 없습니다... 아무나 오세요... 환영합니다... 칼수락 합니다...',
                    studyImg: '/img/sample-img-2.png',
                    studyPersonNum: 4,
                    studyStartDate: '2023-01-01',
                    studyEndDate: '2023-12-31',
                    modifyDate: '2023-02-23',
                },
                {
                    studyBoardPk: 12,
                    studyPk: 12,
                    studyName: '우아한 스터디',
                    adTitle: '우아한 스터디 모집합니다.',
                    adContent:
                        '우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다!',
                    studyImg: '/img/sample-img-3.jpg',
                    studyPersonNum: 4,
                    studyStartDate: '2023-01-01',
                    studyEndDate: '2023-12-31',
                    modifyDate: '2023-02-23',
                },
                {
                    studyBoardPk: 13,
                    studyPk: 13,
                    studyName: '빌런저장소',
                    adTitle: '빌런저장소입니다',
                    adContent:
                        '알고리즘 골드 이상까지 풀어 보실분! Java로 하시는 분 모집합니다! 활발한 분위기고 출석체크 엄격하게 합니다! 스터디 운영 여러개 해봤습니다! 다들 지원해주세요!',
                    studyImg: '/img/sample-img-1.png',
                    studyPersonNum: 4,
                    studyStartDate: '2023-01-01',
                    studyEndDate: '2023-12-31',
                    modifyDate: '2023-02-23',
                },
                {
                    studyBoardPk: 14,
                    studyPk: 14,
                    studyName: '아마zone',
                    adTitle: '아마존에 간 건 아마...존?',
                    adContent:
                        '아마존에 간 존에 대해 이야기하는 스터디입니다... 나이, 성별 제한 없습니다... 아무나 오세요... 환영합니다... 칼수락 합니다...',
                    studyImg: '/img/sample-img-2.png',
                    studyPersonNum: 4,
                    studyStartDate: '2023-01-01',
                    studyEndDate: '2023-12-31',
                    modifyDate: '2023-02-23',
                },
                {
                    studyBoardPk: 15,
                    studyPk: 15,
                    studyName: '우아한 스터디',
                    adTitle: '우아한 스터디 모집합니다.',
                    adContent:
                        '우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다!',
                    studyImg: '/img/sample-img-3.jpg',
                    studyPersonNum: 4,
                    studyStartDate: '2023-01-01',
                    studyEndDate: '2023-12-31',
                    modifyDate: '2023-02-23',
                },
            ])
        );
    }),

    rest.get('/board/:studyBoardPk', (req, res, ctx) => {
        const { studyBoardPk } = req.params; // req.params를 통해 URL에서 studyBoardPk 값을 얻음

        // 사전에 정의된 스터디 정보 객체
        const boardData = {
            1: {
                studyBoardPk: 1,
                studyPk: 1,
                studyName: '빌런저장소',
                adTitle: '빌런저장소입니다',
                adContent:
                    '알고리즘 골드 이상까지 풀어 보실분! Java로 하시는 분 모집합니다! 활발한 분위기고 출석체크 엄격하게 합니다! 스터디 운영 여러개 해봤습니다! 다들 지원해주세요!',
                studyImg: '/img/sample-img-1.png',
                studyPersonNum: 4,
                studyStartDate: '2023-01-01',
                studyEndDate: '2023-12-31',
                modifyDate: '2023-02-23',
            },
            2: {
                studyBoardPk: 2,
                studyPk: 2,
                studyName: '아마zone',
                adTitle: '아마존에 간 건 아마...존?',
                adContent:
                    '아마존에 간 존에 대해 이야기하는 스터디입니다... 나이, 성별 제한 없습니다... 아무나 오세요... 환영합니다... 칼수락 합니다...',
                studyImg: '/img/sample-img-2.png',
                studyPersonNum: 4,
                studyStartDate: '2023-01-01',
                studyEndDate: '2023-12-31',
                modifyDate: '2023-02-23',
            },
            3: {
                studyBoardPk: 3,
                studyPk: 3,
                studyName: '우아한 스터디',
                adTitle: '우아한 스터디 모집합니다.',
                adContent:
                    '우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다!',
                studyImg: '/img/sample-img-3.jpg',
                studyPersonNum: 4,
                studyStartDate: '2023-01-01',
                studyEndDate: '2023-12-31',
                modifyDate: '2023-02-23',
            },
            3: {
                studyBoardPk: 4,
                studyPk: 4,
                studyName: '우아한 스터디',
                adTitle: '우아한 스터디 모집합니다.',
                adContent:
                    '우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다! 우아한 스터디 모집중입니다!',
                studyImg: '/img/sample-img-3.jpg',
                studyPersonNum: 4,
                studyStartDate: '2023-01-01',
                studyEndDate: '2023-12-31',
                modifyDate: '2023-02-23',
            },
        };

        const study = boardData[studyBoardPk];

        if (study) {
            return res(ctx.status(200), ctx.json(study));
        } else {
            return res(ctx.status(404), ctx.json({ error: '해당 스터디가 없습니다.' }));
        }
    }),

    rest.get('/study/:studyPk', (req, res, ctx) => {
        const { studyPk } = req.params;
        const study = {
            1: {
                studyPk: 1,
                studyName: '자바보라능',
            },
        };
        const studyDetails = study[studyPk];
        if (studyDetails) {
            return res(ctx.status(200), ctx.json(studyDetails));
        } else {
            return res(ctx.status(404), ctx.json({ error: 'Study not found' }));
        }
    }),

    rest.get('/study/:studyPk/management', (req, res, ctx) => {
        const { studyPk } = req.params;
        const study = {
            1: {
                studyPk: 1,
                studyName: '자바보라능',
                memberPk: 0,
                content: '헬로우다',
                imageUri: '/img/sample-img-1.png',
                studyPersonNum: 4,
                maxPeople: 4,
                startDate: '2024-01-01',
                closeDate: '2024-11-18',
                adTitle: '자바 알고리즘 스터디',
                adContent:
                    '알고리즘 골드 이상까지 풀어 보실분! Java로 하시는 분 모집합니다! 활발한 분위기고 출석체크 엄격하게 합니다! 스터디 운영 여러개 해봤습니다! 다들 지원해주세요!',
            },
            2: {
                studyPk: 2,
                studyName: '자바보라능',
                memberPk: 0,
                content: '헬로우',
                imageUri: '/img/sample-img-1.png',
                studyPersonNum: 4,
                maxPeople: 6,
                startDate: '2023-01-01',
                closeDate: '2023-12-31',
            },
            3: {
                studyPk: 2,
                studyName: '자바보라능',
                memberPk: 0,
                content: '헬로우',
                imageUri: '/img/sample-img-1.png',
                studyPersonNum: 4,
                maxPeople: 6,
                startDate: '2023-01-01',
                closeDate: '2023-12-31',
            },
            4: {
                studyPk: 3,
                studyName: '자바보라능',
                memberPk: 0,
                content: '헬로우',
                imageUri: '/img/sample-img-1.png',
                studyPersonNum: 4,
                maxPeople: 6,
                startDate: '2023-01-01',
                closeDate: '2023-12-31',
            },
            5: {
                studyPk: 4,
                studyName: '자바보라능',
                memberPk: 0,
                content: '헬로우',
                imageUri: '/img/sample-img-1.png',
                studyPersonNum: 4,
                maxPeople: 6,
                startDate: '2023-01-01',
                closeDate: '2023-12-31',
            },
        };

        const studyDetails = study[studyPk];
        if (studyDetails) {
            return res(ctx.status(200), ctx.json(studyDetails));
        } else {
            return res(ctx.status(404), ctx.json({ error: 'Study not found' }));
        }
    }),

    rest.get('/study/:studyPk/management/board', (req, res, ctx) => {
        const { studyPk } = req.params;
        const study = {
            1: {
                studyBoardPk: 3004,
                adTitle: '홍보 제목',
                adContent: '홍보 내용',
                imageUri: '/img/sample-img-1.png',
            },
        };

        const studyDetails = study[studyPk];
        if (studyDetails) {
            return res(ctx.status(200), ctx.json(studyDetails));
        } else {
            return res(ctx.status(404), ctx.json({ error: 'Study not found' }));
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
                closeDate,
            })
        );
    }),

    // 스터디 멤버 정보 가져오기
    rest.get('/study/:studyPk/management/members', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                    memberPk: 1,
                    nickname: '서다영',
                    imgURL: '/img/member-img-sample.png',
                },
                {
                    memberPk: 2,
                    nickname: '이수지',
                    imgURL: '/img/member-img-sample.png',
                },
            ])
        );
    }),

    // 스터디 정보 수정
    rest.post('/study/:studyPk/management', (req, res, ctx) => {
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

    rest.delete('/study/:studyPk/management/expel', (req, res, ctx) => {
        const { studyPk } = req.params;
        const { memberPk } = req.body; // 요청 본문에서 memberPk 추출

        // 올바른 멤버 PK가 제공되었다고 가정하고, 성공 메시지를 반환
        if (memberPk) {
            return res(
                ctx.status(200),
                ctx.json({
                    message: 'Member has been expelled successfully.',
                    studyPk: studyPk,
                    memberPk: memberPk,
                })
            );
        }

        // 멤버 PK가 제공되지 않았다면 에러 메시지 반환
        return res(
            ctx.status(400),
            ctx.json({
                error: 'Member PK is missing in the request.',
            })
        );
    }),

    rest.get('https://smore.today/subscribe/notification', (req, res, ctx) => {
        // EventSource는 기본적으로 msw에서 직접 지원하지 않으므로, 여기서는 REST API를 예시로 사용합니다.
        // 실제 EventSource 테스트는 다른 방식으로 구현해야 할 수 있습니다.
        return res(
            ctx.status(200),
            ctx.json({
                notificationPk: '0fe8b947-b22e-47d9-ad1c-7f1c8b15172',
                studyPk: '12312421321312',
                receiverPk: 123214124215,
                content: '스터디 가입 신청 요청이 있습니다.',
            })
        );
    }),

    // 수지 API

    // 스터디 생성
    rest.post('/study', (req, res, ctx) => {
        const { studyCreateDTO } = req.body;
        const image = req.body.image;

        return res(
            ctx.status(201),
            ctx.json({
                studyPk: 2004,
                memberPk: 1004,
                studyName: studyCreateDTO.studyName,
                imageUri: image ? '이미지 URL' : null,
                maxPeople: studyCreateDTO.maxPeople,
                content: studyCreateDTO.content,
                startDate: studyCreateDTO.startDate,
                closeDate: studyCreateDTO.closeDate,
            })
        );
    }),

    // 스터디 가입 신청
    rest.post('/board/:studyPk/enter', (req, res, ctx) => {
        const { studyPk } = req.params;
        const { content } = req.body;

        return res(
            ctx.status(200),
            ctx.json({
                studyEnterMemberPk: 789,
                studyPk: studyPk,
                memberPk: 1,
                content: content,
                enterStatus: '대기 중',
                createDate: new Date().toISOString(),
            })
        );
    }),

    rest.get('/study/:studyPK', (req, res, ctx) => {
        const { studyPk } = req.params;
        console.log('get study Pk:', studyPk);
        return res(
            ctx.status(200),
            ctx.json({
                studyPk: 591138934038569899,
                memberPk: 1,
                studyName: '알쓰조',
                imageUri: '이미지 URI',
                maxPeople: 6,
                content: '스터디 내용',
                startDate: '2024-06-01',
                closeDate: '2024-12-31',
            })
        );
    }),

    rest.get('/study/:studyPk/dashboard/members', (req, res, ctx) => {
        const { studyPk } = req.params;
        console.log(`Handling GET request for studyPk: ${studyPk}`);
        return res(
            ctx.status(200),
            ctx.json([
                {
                    memberPk: '1',
                    nickName: '현빙',
                    profileImg: null,
                    role: 'admin',
                    enterDate: '2024-06-13',
                },
                {
                    memberPk: '4',
                    nickName: '넷째',
                    profileImg: null,
                    role: 'member',
                    enterDate: '2020-12-10',
                },
                {
                    memberPk: '2',
                    nickName: '아따마',
                    profileImg: null,
                    role: 'member',
                    enterDate: '2024-06-21',
                },
                {
                    memberPk: '3',
                    nickName: '셋째',
                    profileImg: null,
                    role: 'member',
                    enterDate: '2024-06-25',
                },
            ])
        );
    }),

    rest.get('/study/:studyPk/dashboard/ranking', (req, res, ctx) => {
        const { studyPk } = req.params;
        console.log(`Handling GET request for studyPk: ${studyPk}`);
        return res(
            ctx.status(200),
            ctx.json([
                {
                    memberPk: '4',
                    fullName: '김맛있다빈',
                    learningTime: 24000,
                },
                {
                    memberPk: '3',
                    fullName: '낀헨빈',
                    learningTime: 23000,
                },
                {
                    memberPk: '2',
                    fullName: '기멘빈',
                    learningTime: 21000,
                },
                ,
                {
                    memberPk: '25',
                    fullName: '기멘빈분',
                    learningTime: 25000,
                },
                {
                    memberPk: '26',
                    fullName: '기멘빈방',
                    learningTime: 2000,
                },
            ])
        );
    }),

    // 출석현황 월별 조회
    rest.get('/study/:studyPk/dashboard/attendance/monthly', (req, res, ctx) => {
        const { studyPk } = req.params;
        return res(
            ctx.status(200),
            ctx.json({
                1: [
                    {
                        memberPk: '2',
                        attendanceStatus: '출석',
                        attendanceDate: '2024-07-01',
                    },
                    {
                        memberPk: '1',
                        attendanceStatus: '출석',
                        attendanceDate: '2024-07-01',
                    },
                ],
                2: [
                    {
                        memberPk: '2',
                        attendanceStatus: '출석',
                        attendanceDate: '2024-07-02',
                    },
                    {
                        memberPk: '1',
                        attendanceStatus: '출석',
                        attendanceDate: '2024-07-02',
                    },
                ],
                3: [],
                4: [],
                5: [
                    {
                        memberPk: '2',
                        attendanceStatus: '출석',
                        attendanceDate: '2024-07-05',
                    },
                    {
                        memberPk: '1',
                        attendanceStatus: '출석',
                        attendanceDate: '2024-07-05',
                    },
                ],
                6: [],
                7: [],
                8: [],
                9: [],
            })
        );
    }),

    // 일별 출석 현황
    rest.get('/study/:studyPk/dashboard/attendance/today', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                    memberPk: '2',
                    nickname: '아따마',
                    attendanceStatus: '출석',
                    attendanceDate: '2024-07-02T10:22:05',
                    timeAgo: '1시간 전 출석',
                },
                {
                    memberPk: '1',
                    nickname: '현빙',
                    attendanceStatus: '출석',
                    attendanceDate: '2024-07-02T11:16:58',
                    timeAgo: '5분 전 출석',
                },
                {
                    memberPk: '3',
                    nickname: '셋째',
                    attendanceStatus: '결석',
                    attendanceDate: '+999999999-12-31T23:59:59.999999999',
                    timeAgo: '결석',
                },
            ])
        );
    }),

    rest.get('/study/:studyPk/calendar/list', (req, res, ctx) => {
        const { studyPk } = req.params;
        console.log(`Handling GET request for studyPk: ${studyPk}`);
        return res(
            ctx.status(200),
            ctx.json([
                {
                    calendarPk: 595591589403213881,
                    content: '술마시기',
                    startDate: '2024-07-01',
                    endDate: '2024-07-08',
                },
                {
                    calendarPk: 595592748752865764,
                    content: '바질키우기',
                    startDate: '2024-07-01',
                    endDate: '2024-07-08',
                },
            ])
        );
    }),

    rest.get('/study/:studyPk/calendar/:calendarPk', (req, res, ctx) => {
        const { calendarPk } = req.params;
        console.log(`Handling GET request for calendarPk: ${calendarPk}`);
        return res(
            ctx.status(200),
            ctx.json({
                calendarPk: 595591589403213881,
                content: '술마시기',
                startDate: '2024-07-01',
                endDate: '2024-07-08',
            })
        );
    }),

    rest.post('/study/:studyPk/calendar', (req, res, ctx) => {
        const { content, startDate, endDate } = req.body;
        console.log('POST request body:', req.body); // 디버깅 로그 추가
        return res(
            ctx.status(201),
            ctx.json({
                calendarPk: Date.now(), // 임의의 ID 생성
                content,
                startDate,
                endDate,
            })
        );
    }),

    rest.put('/study/:studyPk/calendar/:calendarPk', (req, res, ctx) => {
        const { calendarPk, content, startDate, endDate } = req.body;
        console.log(
            `Handling PUT request with calendarPk: ${calendarPk}, content: ${content}, startDate: ${startDate}, endDate: ${endDate}`
        );
        return res(
            ctx.status(200),
            ctx.json({
                calendarPk,
                content,
                startDate,
                endDate,
            })
        );
    }),

    rest.delete('/study/:studyPk/calendar/:calendarPk', (req, res, ctx) => {
        const { calendarPk } = req.params;
        console.log(`Handling DELETE request for calendarPk: ${calendarPk}`);
        return res(ctx.status(204)); // 204 No Content
    }),

    // 스터디 문제은행 리스트 불러오기
    rest.get('/study/:studyPk/problem/bank', (req, res, ctx) => {
        const { studyPk } = req.params;
        return res(
            ctx.status(200),
            ctx.json([
                {
                    problemBankPk: 591167815800996861,
                    problemBankName: '팰월드',
                    count: 10,
                },
                {
                    problemBankPk: 591167792866543332,
                    problemBankName: '메이플스토리',
                    count: 20,
                },
                {
                    problemBankPk: 591167792866543232,
                    problemBankName: '메3이플스토리',
                    count: 23,
                },
                {
                    problemBankPk: 591167722866543332,
                    problemBankName: '메이4플5스토리',
                    count: 13,
                },
                {
                    problemBankPk: 593167792866543332,
                    problemBankName: '메이552플스토리',
                    count: 50,
                },
                {
                    problemBankPk: 591167792566543332,
                    problemBankName: '메이플스35토리',
                    count: 25,
                },
            ])
        );
    }),

    // 문제은행 만들기
    rest.post('/study/:studyPk/problem/bank', (req, res, ctx) => {
        const { studyPk } = req.params;
        const { problemName } = req.body;
        return res(
            ctx.status(200),
            ctx.json('591167792866543333') // String형의 18자리 숫자
        );
    }),

    // 문제 만들기
    rest.post('/study/:studyPk/problem', (req, res, ctx) => {
        const { studyPk } = req.params;
        const { studyProblemBankPk, content, explanation, answer, problemOptionRequestDTOList } = req.body;
        return res(
            ctx.status(200),
            ctx.json({
                studyProblemBankPk,
                content,
                explanation,
                answer,
                problemOptionRequestDTOList,
            })
        );
    }),

    // 내가 만든 문제은행 리스트 불러오기
    rest.get('/study/:studyPk/problem/bank/personal', (req, res, ctx) => {
        const { studyPk } = req.params;
        return res(
            ctx.status(200),
            ctx.json([
                {
                    problemBankPk: '591167792866543332',
                    problemBankName: '내가 만든 메이플스토리',
                    count: 27,
                },
                {
                    problemBankPk: '591167815800996861',
                    problemBankName: '내가 만든 팰월드',
                    count: 0,
                },
            ])
        );
    }),

    // 문제은행 및 문제 상세 가져오기
    rest.get('/study/:studyPk/problem/bank/:problemBankPk', (req, res, ctx) => {
        const { problemBankPk } = req.params;
        return res(
            ctx.status(200),
            ctx.json({
                pk: problemBankPk,
                writer: '박진수',
                authority: true,
                problemList: [
                    {
                        problemPk: '595895410357399067',
                        answerPk: '595895410374173286',
                        memberNickname: '박진수',
                        studyBankName: '아무제목',
                        problemContent: '문제 만들기 테스트20',
                        problemExplanation: '테스트 중~',
                        problemDate: '2024-07-02',
                        options: [
                            { problemOptionPk: '595895410374173286', content: '보기 내용1', num: 1 },
                            { problemOptionPk: '595895410374173287', content: '보기 내용2', num: 2 },
                            { problemOptionPk: '595895410374173288', content: '보기 내용3', num: 3 },
                            { problemOptionPk: '595895410374173289', content: '보기 내용4', num: 4 },
                            { problemOptionPk: '595895410374173290', content: '보기 내용4', num: 5 },
                        ],
                    },
                ],
                problemBankName: '아무제목',
            })
        );
    }),

    // 문제은행 이름 수정
    rest.put('/study/:studyPk/problem/bank', (req, res, ctx) => {
        const { problemBankPk, problemBankName } = req.body;
        return res(
            ctx.status(200),
            ctx.json({
                pk: problemBankPk,
                writer: '진수',
                authority: true,
                problemBankName: problemBankName,
            })
        );
    }),
    // 문제 수정
    rest.put('/study/:studyPk/problem', (req, res, ctx) => {
        const { problemPk, problemContent, answer, ProblemExplanation, problemOptionRequestDTOList } = req.body;
        return res(
            ctx.status(200),
            ctx.json({
                problemPk: problemPk,
                problemContent: problemContent,
                answer: answer,
                ProblemExplanation: ProblemExplanation,
                problemOptionRequestDTOList: problemOptionRequestDTOList,
            })
        );
    }),

    // 문제은행 삭제
    rest.delete('/study/:studyPk/problem/:problemBankPk', (req, res, ctx) => {
        const { problemBankPk } = req.params;
        return res(ctx.status(200), ctx.json({ message: '문제은행이 성공적으로 삭제되었습니다.' }));
    }),

    //퀴즈 용 랜덤 문제 불러오기
    rest.get('/study/:studyPk/problem', (req, res, ctx) => {
        const { studyPk } = req.params;
        const studyProblemBankPk = req.url.searchParams.get('studyProblemBankPk').split(',');
        const max = req.url.searchParams.get('max');

        if (!studyProblemBankPk || studyProblemBankPk.length === 0 || !max) {
            return res(ctx.status(404), ctx.json({ message: '없는 문제 입니다.' }));
        }

        return res(
            ctx.status(200),
            ctx.json([
                {
                    problemPk: '595895410357399067',
                    answerPk: '595895410374173286',
                    memberNickname: '박진수',
                    studyBankName: '아무제목',
                    problemContent: '문제 만들기 테스트20',
                    problemExplanation: '테스트 중~',
                    problemDate: '2024-07-02',
                    options: [
                        {
                            problemOptionPk: '595895410374173286',
                            content: '보기 내용1',
                            num: 1,
                        },
                        {
                            problemOptionPk: '595895410374173287',
                            content: '보기 내용2',
                            num: 2,
                        },
                        {
                            problemOptionPk: '295895410374173288',
                            content: '보기 내용3',
                            num: 3,
                        },
                        {
                            problemOptionPk: '395895410374173289',
                            content: '보기 내용4',
                            num: 4,
                        },
                        {
                            problemOptionPk: '995895410374173290',
                            content: '보기 내용4',
                            num: 5,
                        },
                    ],
                },
                {
                    problemPk: '595895413357399067',
                    answerPk: '595895410574173286',
                    memberNickname: '박3진수',
                    studyBankName: '아무2제목',
                    problemContent: '문제 3만들기 테스트20',
                    problemExplanation: '테2스트 중~',
                    problemDate: '2024-07-02',
                    options: [
                        {
                            problemOptionPk: '395895410374173286',
                            content: '보기 내용1',
                            num: 1,
                        },
                        {
                            problemOptionPk: '695895410374173287',
                            content: '보기 내용2',
                            num: 2,
                        },
                        {
                            problemOptionPk: '295895410374173288',
                            content: '보기 내용3',
                            num: 3,
                        },
                        {
                            problemOptionPk: '395895410374173289',
                            content: '보기 내용4',
                            num: 4,
                        },
                        {
                            problemOptionPk: '995895410374173290',
                            content: '보기 내용4',
                            num: 5,
                        },
                    ],
                },
            ])
        );
    }),

    // 개인목표 추가
    rest.post('/study/:studyPk/todo', (req, res, ctx) => {
        const { scheduleStatus, scheduleContent } = req.body;

        if (!scheduleStatus || !scheduleContent) {
            return res(ctx.status(400), ctx.json({ message: '필수 항목을 입력해주세요.' }));
        }

        const newGoal = {
            personalTodoPk: Date.now(),
            studyPk: req.params.studyPk,
            memberPk: 1,
            scheduleStatus,
            scheduleContent,
            createDate: new Date().toISOString().split('T')[0],
        };

        return res(ctx.status(200), ctx.json(newGoal));
    }),

    // 개인 투두 리스트 조회
    rest.get('/study/:studyPk/todo/my', (req, res, ctx) => {
        const { studyPk } = req.params;
        return res(
            ctx.status(200),
            ctx.json([
                {
                    personalTodoPk: '588999420710152135',
                    studyPk: '588999000516386863',
                    memberPk: '1',
                    scheduleStatus: '진행 중',
                    scheduleContent: '수정 테스트',
                    modifyDate: '2023-06-10',
                    createDate: '2024-06-13',
                },
                {
                    personalTodoPk: '594553445012953920',
                    studyPk: '593006509496108934',
                    memberPk: '1',
                    scheduleStatus: '완료',
                    scheduleContent: '리팩토링 후 테스트',
                    modifyDate: '2024-06-29',
                    createDate: '2024-06-29',
                },
                // ... 더 많은 목표 데이터
            ])
        );
    }),

    // 개인목표 수정
    rest.put('/study/:studyPk/todo/:todoPk', (req, res, ctx) => {
        const { studyPk, todoPk } = req.params;
        const { scheduleStatus, scheduleContent } = req.body;

        return res(
            ctx.status(200),
            ctx.json({
                personalTodoPk: todoPk,
                studyPk,
                memberPk: '1',
                scheduleStatus,
                scheduleContent,
                modifyDate: new Date().toISOString().split('T')[0],
                createDate: '2024-06-25',
            })
        );
    }),

    // 개인 목표 삭제
    rest.delete('/study/:studyPk/todo/:todoPk', (req, res, ctx) => {
        const { todoPk } = req.params;

        if (!todoPk) {
            return res(ctx.status(404), ctx.json({ message: 'No Content' }));
        }

        return res(ctx.status(201), ctx.json({ message: '권한이 없습니다.' }));
    }),

    // 상태 별 개인목표 불러오기
    rest.get('/study/:studyPk/todo/status', (req, res, ctx) => {
        const { studyPk } = req.params;
        const status = req.url.searchParams.get('status');

        const goals = [
            {
                personalTodoPk: '593277217600495380',
                studyPk: '588999000516386863',
                memberPk: '1',
                nickName: '현빙',
                profileImg: '대충이미지주소',
                scheduleStatus: status,
                scheduleContent: 'Test content5',
                modifyDate: '2024-06-25',
                createDate: '2024-06-25',
            },
            {
                personalTodoPk: '593277255198233348',
                studyPk: '588999000516386863',
                memberPk: '1',
                nickName: '현빙',
                profileImg: '대충이미지주소',
                scheduleStatus: status,
                scheduleContent: 'Test content6',
                modifyDate: '2024-06-25',
                createDate: '2024-06-25',
            },
        ];

        return res(ctx.status(200), ctx.json(goals));
    }),

    // 스터디 공지사항 불러오기
    rest.get('/study/:studyPk/notice', (req, res, ctx) => {
        const { studyPk } = req.params;

        if (!studyPk) {
            return res(ctx.status(404), ctx.json({ message: '존재하지 않는 게시물 입니다.' }));
        }

        return res(
            ctx.status(200),
            ctx.json([
                {
                    noticeBoardPk: '1',
                    noticeTitle: '1번공지 수정',
                    noticeContent: '집합없음ㅎㅎ',
                    time: '2024-06-20T11:23:16',
                },
                {
                    noticeBoardPk: '2',
                    noticeTitle: '22222',
                    noticeContent: '집합시간 4시',
                    time: '2024-06-20T11:23:44',
                },
                {
                    noticeBoardPk: '3',
                    noticeTitle: '3번공지',
                    noticeContent: '공지사항 내용3',
                    time: '2024-06-20T11:25:44',
                },
                {
                    noticeBoardPk: '4',
                    noticeTitle: '4번공지',
                    noticeContent: '공지사항 내용4',
                    time: '2024-06-20T11:25:44',
                },
                {
                    noticeBoardPk: '5',
                    noticeTitle: '5번공지',
                    noticeContent: '공지사항 내용5',
                    time: '2024-06-20T11:25:44',
                },
                {
                    noticeBoardPk: '6',
                    noticeTitle: '6번공지',
                    noticeContent: '공지사항 내용6',
                    time: '2024-06-20T11:25:44',
                },
                // 필요한 만큼 더 추가
            ])
        );
    }),

    // 스터디 공지 추가
    rest.post('/study/:studyPk/notice', (req, res, ctx) => {
        const { studyPk } = req.params;
        const { noticeTitle, noticeContent } = req.body;

        if (noticeTitle.length < 1 || noticeTitle.length > 30) {
            return res(ctx.status(400), ctx.json({ message: '제목은 공백 포함 1자 이상 30자 이하로 해주세요.' }));
        }

        return res(
            ctx.status(200),
            ctx.json({
                noticeBoardPk: '4',
                noticeTitle,
                noticeContent,
                time: new Date().toISOString(),
            })
        );
    }),

    // 공지사항 수정하기
    rest.put('/study/:studyPk/notice/:noticeBoardPk', (req, res, ctx) => {
        const { studyPk, noticeBoardPk } = req.params;
        const { noticeTitle, noticeContent } = req.body;

        // 수정된 공지사항 데이터 업데이트
        const updatedAnnouncement = {
            noticeBoardPk,
            noticeTitle,
            noticeContent,
            time: new Date().toISOString(),
        };

        return res(ctx.status(200), ctx.json(updatedAnnouncement));
    }),

    // 공지사항 삭제
    rest.delete('/study/:studyPk/notice/:noticeBoardPk', (req, res, ctx) => {
        const { noticeBoardPk } = req.params;

        if (!noticeBoardPk) {
            return res(ctx.status(404), ctx.json({ message: '존재하지 않는 게시물 입니다.' }));
        }

        return res(ctx.status(200), ctx.json({ message: '삭제 완료' }));
    }),
];
