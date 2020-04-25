/*

create database sth;
drop ";
use sth;
//현재 선택된 db
select database();

////create tables;
CREATE TABLE cats
  (
    name VARCHAR(100),
    age INT
  );


show tables;
DESC sth;
drop table sth;



insert into cats(age, name) values(11, 'draco');
SELECT * FROM cats; // *는 전부를 뜻함, 특정값(NAME, AGE..)만 선택가능
          "       WHERE age=4; //이런식으로 특정값 지정검색가능

/////not null value table(null은 값이 아예 없다는뜻으로, 아래에서 공값생성시 네임태그는'', int값은 0으로 저장된다)//
    CREATE TABLE cats2
      (
        name VARCHAR(100) NOT NULL,
        age INT NOT NULL
      );
		
//default 값과 not null속성을 동시에 사용할 수도 있다.
    CREATE TABLE cats4
      (
        name VARCHAR(20) NOT NULL DEFAULT 'unnamed',
        age INT NOT NULL DEFAULT 99
      );
	  
	  
	  
	  
	  
	 // 이름이 중복되는걸 구분하기위해 primary key를 사용, primary key는 중복불가.
	 // 아래는 별도의 cat id생성후(AUTO_INCREMENT 자동으로 숫자가 생성됨) 이를 프라이머리 키로 설정함.
	 //
	 
	    CREATE TABLE unique_cats2 (
        cat_id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(100),
        age INT,
        PRIMARY KEY (cat_id)
    );
	  
	  
	  
	  //예시
	      CREATE TABLE cats5 
      ( 
         cat_id INT NOT NULL AUTO_INCREMENT, 
         name   VARCHAR(100), 
         breed  VARCHAR(100), 
         age    INT, 
         PRIMARY KEY (cat_id) 
      ); 
	  
	      INSERT INTO cats5(name, breed, age) 
    VALUES ('Ringo', 'Tabby', 4),
           ('Cindy', 'Maine Coon', 10),
           ('Dumbledore', 'Maine Coon', 11),
           ('Egg', 'Persian', 4),
           ('Misty', 'Tabby', 13),
           ('George Michael', 'Ragdoll', 9),
           ('Jackson', 'Sphynx', 7);



		//CODE: Introduction to Aliases

    SELECT cat_id AS id, name FROM cats;
     
    SELECT name AS 'cat name', breed AS 'kitty breed' FROM cats;
     
    DESC cats;

///////////update

UPDATE cats SET breed='Shorthair' WHERE breed='Tabby';
UPDATE cats SET age=14 WHERE name='Misty';


//delete
DELETE FROM cats WHERE name='Egg';
DELETE FROM cats; ->모든데이터 지워지니 조심!



// sql 파일 불러오기
source sth.sql


///////////////////////String Functions//////////////////////////

//출력값 합쳐서 보여주기(CONCAT)
	SELECT CONCAT(author_fname, ' ', author_lname) FROM books;

//이렇게 표현할 수도 있다.(CONCAT_WS)
//맨 첫번째 배열이 item출력이 끝날때마다 출력됨
 	SELECT CONCAT_WS(' ', author_fname, author_lname) FROM books;
 
 
 
 //값의 특정부분만 선택해서 표시할 수 있다(SUBSTRING or SUBSTR)
 //SUBSTRING은 배열의 첫번째가 1부터 시작한다
 
 	SELECT SUBSTRING(title, 1, 3) AS 'short title' FROM books;
 
 
 //REPLACE(대상, 바꾸고싶은거, 바꿀내용)
 	SELECT REPLACE('cheese bread coffee milk', ' ', ' and ');
 
 
 //REVERSE

    SELECT REVERSE('Hello World');
 	SELECT CONCAT(author_fname, REVERSE(author_fname)) FROM books;
 
 //CHAR_LENGTH
	 SELECT CONCAT(author_lname, ' is ', CHAR_LENGTH(author_lname), ' characters long')AS RESULT FROM books;
	 ->
	 +--------------------------+
	 | RESULT                   |
	 +--------------------------+
	| Lahiri is 6long          |
	| Gaiman is 6long          |
	| Gaiman is 6long          |
	| Lahiri is 6long          |
	...
 
 
 
 //  UPPER / LOWER
 
 	SELECT CONCAT('MY FAVORITE BOOK IS ', LOWER(title)) FROM books;
 
 /////////////////////////////////////////////////////////////////////
 
 
 
 /////////////////////refining selections////////////////////////////
 
 //distinct ->중복없이 출력
 SELECT DISTINCT author_lname FROM books;
 
 
 //order by 정렬
	 SELECT released_year FROM books ORDER BY released_year;
	 SELECT released_year FROM books ORDER BY released_year DESC; 내림차
	 SELECT released_year FROM books ORDER BY released_year ASC; 오름차(기본값)
	 
 	SELECT title, author_fname, author_lname FROM books ORDER BY 2;
		->2는 author_fname을 가르킨다(단축키느낌)
	SELECT title, author_fname, author_lname FROM books ORDER BY 1,2; 
		->title을 먼저 정렬한 후 두번째 fname을 정렬한다
		
		




//limit ->보여주는 아이템 갯수 제한
	
	SELECT title, author_fname, author_lname FROM books ORDER BY 1,2 LIMIT 3;
		-> 결과값 3개만 나옴
	SELECT title, author_fname, author_lname FROM books ORDER BY 1,2 LIMIT 1,3;
		->테이블의 두번째아이템부터 순차적으로 나옴(스트링에서는 1베이스더니 여기서는 왜 또 0베이스임..?? 이해가 안가네 ㅅㅂ)

	SELECT * FROM tbl LIMIT 95,18446744073709551615; -> 이렇게 전부를 표시하게 할수도 있다 허헣..



//like 음.. 어디서 본거같은데.. 무슨can..뭐더라 할때

	SELECT title FROM books WHERE title LIKE '%can%'; 
		-> 여기서 %는 와일드카드라고 앞뒤로 뭐가 오든 can이 있으면 일단 나온다

		->
		+---------------+
		| title         |
		+---------------+
		| American Gods |
		| Cannery Row   |
	...

		-> can이 들어있는 아이템이 출력됨

	 *여기서 주의할 점은
	 SELECT title FROM books WHERE title LIKE '%can'; 
	 이렇게 치면 American Gods이 나올거같지만 아무것도 나오지 않는다. 왜냐하면 이것은 ~can(끝)인 것을 의미하기 때문이다.

	//두번째 와일드 카드는 '_'이다. %는 자리수제한이 없는데반해 _는	하나당 자리수 한개를 의미한다.
	
		(235)234-0987 LIKE '(___)___-____'
		SELECT title, stock_quantity FROM books WHERE stock_quantity LIKE '__';
		
	//찾고자 하는 아이템에 %나 _가 포함된 경우 앞에 \를 붙이면 된다.
		SELECT title FROM books WHERE title LIKE '%\_%'
		
		
		
///////////////////////////////////////////////////////////////////
더 공격적인 함수들

	//count() ->아이템 갯수를 세줌, from 뒤에 조건을 넣어준다
		SELECT COUNT(*) FROM books;
		SELECT COUNT(DISTINCT author_lname, author_fname) FROM books;
		SELECT COUNT(*) FROM books WHERE title LIKE '%the%';
		





	//group by() ->중복되는 아이탬들을 그룹화한다
		SELECT author_fname, author_lname, COUNT(*) FROM books GROUP BY author_lname, author_fname;
		SELECT CONCAT('In ', released_year, ' ', COUNT(*), ' book(s) released') AS year FROM books GROUP BY released_year; -> 여기서 count는 group by 안에 있는 열들을 센다.






	//min/max()
		SELECT MIN(released_year) FROM books;
		
		-하지만 다음과같은 명령을 내리면 문제가있다.
		SELECT title, MAX(released_year) FROM books;	
		-타이틀과 장수가 서로 일치하지 않는문제인데
		
		SELECT title, pages FROM books WHERE pages = (SELECT Max(pages) FROM books); 
		-이렇게 혹은
		
		SELECT title, pages FROM books ORDER BY pages ASC LIMIT 1;
		-이렇게 하면 된다.
		
	
	
	
	
	
	
	//min/max+group by
		SELECT author_fname, author_lname, Min(released_year) FROM books GROUP BY 1,2;
		-> 저자가 쓴 책들을 그룹화 후 쓴 책 중에 가장 오래된책의 페이지 수를 보여줌
	
	
	
	
	
	
	//sum() 합계
		SELECT SUM(released_year) FROM books;
		
		
		
	
	
	//avg() 평균
		SELECT author_fname, author_lname, AVG(pages) FROM books
		GROUP BY author_lname, author_fname;
	
		
		
	//////////////////////////////////////////////////////////
	
	
	/////////////////////Data Type//////////////////////
	
	
	//char vs varchar(사진참조)
		char는 고정된 값이다. 값보다 적은게 들어가면 빈칸이 채워짐
	
	
	
	//decimal(a,b) -소수자리표현 0, 정확한 계산
		a:전체길이
		b: 소숫점길이
		ex)decimal(5,2) ->999.99
		더 큰 수가 들어오면 999.99로 표시됨
		소숫점의 경우 올림하여 1이 추가되거나 잘림
	
	
	//float 7자리, double 15자리 - 대략적인 표현, 정확하지않아 대체적으로 decimal씀
		
	
	//Date, time, datetime
		date:yyyy-mm-dd
		time:hh:mm:ss
		datetime: date + time
			CREATE TABLE people (name VARCHAR(100), birthdate DATE, birthtime TIME, birthdt DATETIME);
			INSERT INTO people (name, birthdate, birthtime, birthdt)
			VALUES('Padma', '1983-11-11', '10:07:35', '1983-11-11 10:07:35');
			
		
	//curdate(), curtime, now() 현재시간을 나타냄
		insert into people(name, birthdate, birthtime, birthdt) values('micro', curdate(), curtime(), now());
 
 
	//Formatting Dates <- SQL기본포맷이 연도-월-일이라 깊게 안봤음. 나중에 필요하면 #163 보자..
	SELECT DATE_FORMAT(birthdt, '%m/%d/%Y at %h:%m') FROM people;
	DAYNAME(a) -> 월~일 영어로 표시
	
	//DATE MATH
		//datediff(a,b) a-b값 (일)로 반환
			SELECT name, birthdate, DATEDIFF(NOW(), birthdate) FROM people;
		
		//date_add(a,b)
			SELECT birthdt, DATE_ADD(birthdt, INTERVAL 1 MONTH) FROM people;
 
			SELECT birthdt, DATE_ADD(birthdt, INTERVAL 10 SECOND) FROM people;
			//이렇게도 된다
			SELECT birthdt, birthdt - INTERVAL 5 MONTH FROM people;
	
	
	
	//TIMESTAMPS
		DATETIME VS TIMESTAMP
		-> TIMESTAMP는 4BYTE로 DATETIME의 절반의 용량을 가지나, 시간표현에 한계가 있다(1970~2038년)
		CREATE TABLE comments2 (content VARCHAR(100), changed_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW());
			onupdate는 데이터의 수정이 있을경우의 행동을 의미한다.
	
	
	
	///////////////////////////////////////////////////////////////////////////
	
	
	//!=(not equal)
	
	//not like
		SELECT title FROM books WHERE title NOT LIKE 'W%';
		
		
			
	// >,<
		SELECT title, released_year FROM books WHERE released_year >= 2000 ORDER BY released_year;
		
		100 > 5
			-- true

		-15 > 15
			-- false

		9 > -10
			-- true

		1 > 1
			-- false

		'a' > 'b'
			-- false

		'A' > 'a'
			-- false

		'A' >=  'a'
			-- true
			
			-> sql은 대/소붐자를 구분하지 않기 때문이다.
			
			
			
					
			
	//  && / AND
		SELECT * FROM books WHERE author_lname='Eggers' AND released_year > 2010 AND title LIKE '%novel%';
	
	
	// || / OR
		SELECT 40 <= 100 || -2 > 0;
		-- true

		SELECT 10 > 5 || 5 = 5;
		-- true

		SELECT 'a' = 5 || 3000 > 2000;
		-- true
	
	
	//between ->and와 ><연산자를 섞은거임
		SELECT title, released_year FROM books WHERE released_year >= 2004 && released_year <= 2015;
		SELECT title, released_year FROM books WHERE released_year BETWEEN 2004 AND 2015;
		
	//not between
		SELECT title, released_year FROM books WHERE released_year NOT BETWEEN 2004 AND 2015;
	
	//cast() 날짜 형변환
		SELECT CAST('2017-05-02' AS DATETIME);
		
	//in
		지금까지 or을 이용해 길게 써야했던것을 간결하세 표현할 수 있다.
			SELECT title, author_lname FROM books WHERE author_lname='Carver' OR author_lname='Lahiri' OR author_lname='Smith';
			-> SELECT title, author_lname FROM books WHERE author_lname IN ('Carver', 'Lahiri', 'Smith');
		
	//not in(!=)
		SELECT title, released_year FROM books WHERE released_year NOT IN (2000,2002,2004,2006,2008,2010,2012,2014,2016);
	
	//%
	위에보다 더 간단하게 표현할 수 있다.
		SELECT title, released_year FROM books WHERE released_year >= 2000 AND released_year % 2 != 1;
	%는 나머지값을 의미, 나머지가 0인것만 표시
	
	
	
	//CASE states
		if문과 비슷, case, when로 시작해 then, end로 끝난다.
			SELECT title, stock_quantity,
				CASE 
					WHEN stock_quantity <= 50 THEN '*'
					WHEN stock_quantity <= 100 THEN '**'
					ELSE '***'
				END AS STOCK
			FROM books; 
	
	/////////////////////////////////////////////////////////
		
		
	//////////////////////one to many////////////////////////
	//손님과 주문, 책과 리뷰같은 관계?
	
	//https://www.udemy.com/course/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/lecture/6965510#questions/9198266
	//foreign key <- 잘못된 데이터를 넣지 않게하는 기능..??		
			CREATE TABLE customers(
			id INT AUTO_INCREMENT PRIMARY KEY,
			first_name VARCHAR(100),
			last_name VARCHAR(100),
			email VARCHAR(100)
		);
		CREATE TABLE orders(
			id INT AUTO_INCREMENT PRIMARY KEY,
			order_date DATE,
			amount DECIMAL(8,2),
			customer_id INT,
			FOREIGN KEY(customer_id) REFERENCES customers(id) <- 여기서 외부키 생성연결
		);

		//값을 넣는다
				INSERT INTO customers (first_name, last_name, email) 
			VALUES ('Boy', 'George', 'george@gmail.com'),
				   ('George', 'Michael', 'gm@gmail.com'),
				   ('David', 'Bowie', 'david@gmail.com'),
				   ('Blue', 'Steele', 'blue@gmail.com'),
				   ('Bette', 'Davis', 'bette@aol.com');

			INSERT INTO orders (order_date, amount, customer_id)
			VALUES ('2016/02/10', 99.99, 1),
				   ('2017/11/11', 35.50, 1),
				   ('2014/12/12', 800.67, 2),
				   ('2015/01/03', 12.50, 2),
				   ('1999/04/11', 450.25, 5);
		//잘 들어갔다. 하지만 이렇게 넣으면 에러가 난다
			INSERT INTO orders (order_date, amount, customer_id)
			VALUES ('2016/06/06', 33.67, 98);
		//왜냐하면 order에 있는 customer_id값이 customers테이블값에 있는 id에 없기 때문이다.
		
		
	//subquery
	    SELECT id FROM customers WHERE last_name='George';
   		SELECT * FROM orders WHERE customer_id = 1;
		//아래와같이 한번에 가능하다
		->
	    SELECT * FROM orders WHERE customer_id =
        (
            SELECT id FROM customers
            WHERE last_name='George'
        );
	
	
	
	//join
		//조인이란?
			// 두개이상의 테이블이나 데이터베이스를 연결하여 데이터를 검색하는 방법입니다. 
			// 자신이 검색하고 싶은 컬럼이 다른 테이블에 있을경우 주로 사용하며 
			// 여러개의 테이블을 마치 하나의 테이블인 것처럼 활용하는 방법입니다. 
			// 보통 Primary key혹은 Foreign key로 두 테이블을 연결합니다. 
			// 테이블을 연결하려면 적어도 하나의 칼럼은 서로 공유되고 있어야합니다.
			// 고등학교 수학시간때 배웠던 벤다이어그램을 활용하면 쉽게 이해할 수 있습니다.
		//crossjoin: SELECT * FROM customers, orders; <-별로 쓸모없음

		//inner join
			명시적 표현과 암묵적 표현으로 나뉜다.
			# 명시적 표현법 (explicit notation)
				SELECT * FROM customers
				JOIN orders //<-INNER JOIN이라고 써도 됨
				ON customers.id = orders.customer_id;
				
			# 암묵적 표현법 (implicit notation)
				    SELECT * FROM customers, orders 
   					WHERE customers.id = orders.customer_id;
		
			//응용
			SELECT first_name, last_name, order_date, SUM(amount) AS total_spent FROM customers
			JOIN orders 
			ON customers.id = orders.customer_id
			GROUP BY orders.customer_id
			ORDER BY total_spent desc;
		
		
		//left join
			SELECT * FROM customers
			LEFT JOIN orders 
			ON customers.id = orders.customer_id;
			
			//응용
			SELECT *, ifnull(sum(amount),0) FROM customers  <- ifnull(a,b) a는 비교값, b는 널일경우 출력값
			LEFT JOIN orders 
			ON customers.id = orders.customer_id
			GROUP BY customers.id;
		
		
		//right join
			SELECT * FROM customers
			JOIN orders 
			ON customers.id = orders.customer_id;
		
		
		
		
		//where vs on
			//결론적으로 같은기능을 하나 on이 우선순위가 더 높다
			//https://stackoverflow.com/questions/354070/sql-join-where-clause-vs-on-clause
		
		
		
		//참고
		foreign_key관계가 이어져있는건 지울수가 없다.
		외래키 테이블 생성할때 ON DELETE CASCADE를 넣어야한다.
		

		//종합
		select students.first_name, 
				ifnull(avg(grade),'0') as average, 
				case 
					when avg(grade)>80 then 'PASS' 
					else 'fail' 
			end as result 
		from students 
			left join paper 
				on students.id = paper.student_id 
		group by 1 
		order by average desc;
		
//////////////////////////////////////////////////

//////////////////many to many//////////////////////

	//IS NULL
	//아래는 특정 항목의 값이 null인 행을 찾아 출력한다
	//하지만 마지막줄 rating IS NULL 은 rating = NULL로 비교할 수 없다. NULL은 연산자로 비교할 수 없기 때문이다.
		SELECT title, rating
		FROM series
		LEFT JOIN reviews
			ON series.id = reviews.series_id
		WHERE rating IS NULL; <- '=' 을 is로 표현
		
		
		//ROUND(A,B) 숫자 소숫점 자릿수 끊기
		SELECT 
			genre, 
			ROUND(AVG(rating),2) <-소숫점 2자리까지만 나옴
		FROM series
		JOIN reviews
			ON series.id = reviews.series_id
		GROUP BY genre;

	//두개의 조인을 겹칠수도 있다
		SELECT
			title,
			rating,
			CONCAT(first_name,' ',last_name) AS reviewer
		FROM reviewers
		INNER JOIN reviews
			ON reviewers.id = reviews.reviewer_id
		INNER JOIN series
			ON series.id = reviews.series_id;

/////////////////////

 primary key    vs   unique
 p/k는 테이블당 하나만 선언 가능, 유니크는 여러번가능
 CREATE TABLE users (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
); 
 
 
 //having
 where은 그룹화된 데이터를 선택하지 못하지만 해빙은 그룹한 데이터에서 필터를 걸수있다
 

	select 
		users.username, count(*) as 'total'
	from users 
	join likes 
		on users.id = likes.user_id
	group by likes.user_id having total = (select count(*) from photos);


 
*/

































