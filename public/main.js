function init() {
    console.log("I'm initiated");
    $('#submit-article').click(function (event) {
        event.preventDefault();
        let body = {};
        let input = $("#input-article");
        body.tutorialLink = input.val();
        body.tutorialType = input.attr("data-tutorialType");
        body.topicID = input.attr("data-topicID");
        $.ajax({
            type: "POST",
            url: "/api/tutorial",
            data: body
        }).then(function(data) {
            console.log(data);
        });
    });
    $('.child-topics').click((event) => {
        const topicID = event.target.dataset.topicid;
        console.log("topic id:", topicID);
        window.location.href = `${topicID}`;
    });
}

$(document).ready(() => {
    init();
});
