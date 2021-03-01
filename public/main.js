function init() {
    console.log("I'm initiated");

    // Posting a new article/video to db.
    $('#submit-article').click(function (event) {
        event.preventDefault();
        postMediaData('article')
    });
    $('#submit-video').click(function (event) {
        event.preventDefault();
        postMediaData('video')
    });

    // Increase/decrease a tutorial's votes sum through POST request to db.
    $('.voting').click(event => {
        event.preventDefault();
        let voteType = $(event.target).parent().attr("data-votetype");
        let tutorialID = $(event.target).parent().parent().attr("data-tutorialid");
        $.ajax({
            type: "POST",
            url: "/api/vote",
            data: {
                voteType,
                tutorialID
            }
        }).then(function (data) {
            console.log(data);
            location.reload();
        });

    })

    $('.child-topics').click((event) => {
        const topicID = event.target.dataset.topicid;
        console.log("topic id:", topicID);
        window.location.href = `${topicID}`;
    });
}

// Makes a POST request to db, with media data in body.
function postMediaData(inputType) {
    let input;
    if (inputType === "article") input = $("#input-article");
    else input = $("#input-video");
    let body = {};
    if (!isValidInput(input.val())) {
        $(`#${inputType}-alert`).show();
        $(".btn-close").click(function () {
            $(`#${inputType}-alert`).hide();
        })
        return;
    }
    else {
        body.tutorialLink = input.val().trim();
        body.tutorialType = input.attr("data-tutorialType");
        body.topicID = input.attr("data-topicID");

        $.ajax({
            type: "POST",
            url: "/api/tutorial",
            data: body
        }).then(function (data) {
            console.log(data);
            location.reload();
        });
    }

}

// Prevent bad input from getting passed to the server.
function isValidInput(inputURL) {
    // null == undefined in JS (abstract equality). idk man I don't make the rules.
    if (inputURL != null) {
        let trimmedInput = inputURL.trim();
        return (!trimmedInput.includes(' '))
            && (trimmedInput.includes('.'))
            // Url must contain letters. parseInt(string) = NaN if string has no numbers, and !NaN = true.
            && (!parseInt(trimmedInput));
    }
    else {
        return false;
    }

}

$(document).ready(() => {
    init();
});
