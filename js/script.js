
$(document).ready(function () {

    // 問題を定義する
    const quizzes = [
        {
            question: '桜の名所として知られる「吉野山（よしのやま）」がある都道府県はどこでしょう？',
            options: ['奈良県', '山梨県', '京都府'],
            correct: 'A',
            correctClass: 'nara',  // 奈良県のクラス名
            memo: '吉野山（よしのやま）は奈良県にあるよ！'
        },
        {
            question: '「ふぐ」の養殖（ようしょく）が盛んな都道府県はどこでしょう？',
            options: ['福岡県', '山口県', '長崎県'],
            correct: 'B',
            correctClass: 'yamaguchi',  // 山口県のクラス名
            memo: 'ふぐの養殖が盛んなのは、山口県だよ！'
        },
        {
            question: '「松茸（まつたけ）」の生産量が日本一と言われる都道府県はどこでしょう？',
            options: ['長野県', '北海道', '山形県'],
            correct: 'A',
            correctClass: 'nagano',  // 長野県のクラス名
            memo: '松茸（まつたけ）の生産量が日本一なのは、長野県なんだね！'
        },
        {
            question: '「小豆（しょうど）島」がある都道府県はどこでしょう？',
            options: ['徳島県', '愛媛県', '香川県'],
            correct: 'C',
            correctClass: 'kagawa',  // 香川県のクラス名
            memo: '小豆（しょうど）島は香川県にあるよ。オリーブの栽培（さいばい）で有名だよ！'
        },
        {
            question: '「カレーパン」の発祥（はっしょう）の地と言われている都道府県はどこでしょう？',
            options: ['大阪府', '東京都', '神奈川県'],
            correct: 'A',
            correctClass: 'osaka',  // 大阪府のクラス名
            memo: '一説にカレーパンは大阪が発祥（はっしょう）と言われているよ。'
        }
    ];


    //リセットする 
    let currentQuizIndex = 0;
    let score = 0;

    // スタートボタンを押したら、スタートボタンを隠して、クイズの箱を表示させて、クイズをロードを合図する
    $('.start-btn').click(function () { 
        $(this).hide(); 
        $('.quiz-container').show(); 
        loadQuiz(); 
    });
 
    console.log("スタートボタン")


    // // クイズをロードする関数
    function loadQuiz() {
        const quiz = quizzes[currentQuizIndex];
        $('#question').text(quiz.question); 
        $('#options .option-btn').each(function (index) { 
            $(this).text(quiz.options[index]);
            $(this).data('answer', String.fromCharCode(65 + index)); 
        });
        $('#result, #result-memo, #next-btn, #result-btn').hide();
    }
     console.log("クイズロード")


    // 地図の色塗り。正解し、色塗りの指示を受けたら色を塗る
    function colorPrefecture(prefectureClass) {
        // SVGファイルから適切なクラスを呼び出す。色を赤く塗る
        const svgObject = document.getElementById("japan-map");
        const svgDoc = svgObject.contentDocument;
        const prefecture = svgDoc.querySelector(`.${prefectureClass}`);
        if (prefecture) {
            prefecture.style.fill = "red";
        }
    }

    console.log("色塗り")

    // 選択肢のボタンを押したら、答えを確認する。あっていれば20点加算する。結果を合図する。
    $('#options').on('click', '.option-btn', function () { 
        const selectedAnswer = $(this).data('answer'); 
        const isCorrect = selectedAnswer === quizzes[currentQuizIndex].correct;
        if (isCorrect) {
            score += 20;  
        }

        // 結果があっていたら、地図の色塗りに指示を出す
        showResult(isCorrect); 
        if (isCorrect) {
            colorPrefecture(quizzes[currentQuizIndex].correctClass); 
        }

    });

    console.log("選択肢ボタン")



    // 正解を見に行く、正解と不正解で色とメモを変える
    function showResult(isCorrect) {
        const quiz = quizzes[currentQuizIndex];
        $('#result')
            .text(isCorrect ? 'せいかい！' : 'ざんねん！')
            .css('color', isCorrect ? 'green' : 'red') // 正解なら緑、不正解なら赤
            .show();
        $('#result-memo').text(quiz.memo).show();

        // 残りの問題数で次へボタンか結果ボタンを表示する
        if (currentQuizIndex < quizzes.length - 1){
            $('#next-btn').show();
        } else {
            $('#result-btn').show();
        }
    }

    console.log("結果表示")

    // 次へボタン
    $('#next-btn').click(function () {
        currentQuizIndex++;
        loadQuiz();
    });

    console.log("次へボタン")

    // 結果ボタン。クイズセクションを消して、結果セクションを表示。点数計算して表示。点数に応じたコメントを表示
    $('#result-btn').click(function () {
        $('.quiz-section').hide();
        $('.result-section').show();
        $('#final-score').text(`${score}点！`);
        let comment;
        if (score === 100) {
            comment = '全問正解！すごいね！';
        } else if (score >= 40) {
            comment = 'がんばったね！';
        } else {
            comment = 'もう一度やってみてね。';
        }
        $('#score-comment').text(comment); // 〜〜点部分
    });

    console.log("結果ボタン")

});
