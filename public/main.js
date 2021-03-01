function init() {
    console.log("I'm initiated");
    // Posting a new article to db.
    $('#submit-article').click((event) => {
        event.preventDefault();
        const body = {};
        const input = $('#input-article');
        body.tutorialLink = input.val();
        body.tutorialType = input.attr('data-tutorialType');
        body.topicID = input.attr('data-topicID');
        $.ajax({
            type: 'POST',
            url: '/api/tutorial',
            data: body,
        }).then((data) => {
            console.log(data);
            location.reload();
        });
    });
    $('#submit-video').click((event) => {
        event.preventDefault();
        const body = {};
        const input = $('#input-video');
        body.tutorialLink = input.val();
        body.tutorialType = input.attr('data-tutorialType');
        body.topicID = input.attr('data-topicID');
        $.ajax({
            type: 'POST',
            url: '/api/tutorial',
            data: body,
        }).then((data) => {
            console.log(data);
            location.reload();
        });
    });

    // Increase/decrease a tutorial's votes sum through POST request to db.
    $('.voting').click((event) => {
        event.preventDefault();
        let voteType = $(event.target).parent().attr('data-votetype');
        let tutorialID = $(event.target)
            .parent()
            .parent()
            .attr('data-tutorialid');
        $.ajax({
            type: 'POST',
            url: '/api/vote',
            data: {
                voteType,
                tutorialID,
            },
        }).then((data) => {
            console.log(data);
            location.reload();
        });
    });

    $('.child-topics').click((event) => {
        const topicID = event.target.dataset.topicid;
        console.log('topic id:', topicID);
        window.location.href = `${topicID}`;
    });
}

$(document).ready(() => {
    init();
});
