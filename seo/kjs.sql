-- PROJECT
DROP TABLE IF EXISTS 프로젝트정보 RESTRICT;

-- 협업자
DROP TABLE IF EXISTS 협업정보 RESTRICT;

-- MEMBERS
DROP TABLE IF EXISTS 사용자정보 RESTRICT;

-- PROJECT
CREATE TABLE 프로젝트정보 (
	PID   VARCHAR(40)  NOT NULL COMMENT '프로젝트일련번호', -- 프로젝트일련번호
	PNAME VARCHAR(40)  NOT NULL COMMENT '프로젝트명', -- 프로젝트명
	PDATE DATE         NOT NULL COMMENT '생성일', -- 생성일
	PMEMO VARCHAR(255) NULL     COMMENT '메모' -- 메모
)
COMMENT 'PROJECT';

-- PROJECT
ALTER TABLE 프로젝트정보
	ADD CONSTRAINT PK_프로젝트정보 -- PROJECT 기본키
		PRIMARY KEY (
			PID -- 프로젝트일련번호
		);

-- 협업자
CREATE TABLE 협업정보 (
	UID  VARCHAR(40) NOT NULL COMMENT '아이디', -- 아이디
	PID  VARCHAR(40) NOT NULL COMMENT '프로젝트일련번호', -- 프로젝트일련번호
	AUTH VARCHAR(10) NOT NULL COMMENT '권한' -- 권한
)
COMMENT '협업자';

-- 협업자
ALTER TABLE 협업정보
	ADD CONSTRAINT PK_협업정보 -- 협업자 기본키
		PRIMARY KEY (
			UID, -- 아이디
			PID  -- 프로젝트일련번호
		);

-- MEMBERS
CREATE TABLE 사용자정보 (
	UID   VARCHAR(40)  NOT NULL COMMENT '아이디', -- 아이디
	PWD   VARCHAR(40)  NOT NULL COMMENT '비밀번호', -- 비밀번호
	EMAIL VARCHAR(40)  NOT NULL COMMENT '이메일', -- 이메일
	GURL  VARCHAR(255) NULL     COMMENT '기트주소' -- 기트주소
)
COMMENT 'MEMBERS';

-- MEMBERS
ALTER TABLE 사용자정보
	ADD CONSTRAINT PK_사용자정보 -- MEMBERS 기본키
		PRIMARY KEY (
			UID -- 아이디
		);

-- MEMBERS 유니크 인덱스
CREATE UNIQUE INDEX UIX_사용자정보
	ON 사용자정보 ( -- MEMBERS
		EMAIL ASC -- 이메일
	);

-- 협업자
ALTER TABLE 협업정보
	ADD CONSTRAINT FK_사용자정보_TO_협업정보 -- MEMBERS -> 협업자
		FOREIGN KEY (
			UID -- 아이디
		)
		REFERENCES 사용자정보 ( -- MEMBERS
			UID -- 아이디
		);

-- 협업자
ALTER TABLE 협업정보
	ADD CONSTRAINT FK_프로젝트정보_TO_협업정보 -- PROJECT -> 협업자
		FOREIGN KEY (
			PID -- 프로젝트일련번호
		)
		REFERENCES 프로젝트정보 ( -- PROJECT
			PID -- 프로젝트일련번호
		);