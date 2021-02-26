function init() {
    console.log("I'm initiated");
    $('#submit-article').click(function (event) {
        event.preventDefault();
        console.log('Value:', $('#input-article').val());
    });
    $('.child-topics').click((event) => {
        const topicID = event.target.dataset.topicid;
        window.location.href = `/topics/${topicID}`;
    });
}

$(document).ready(() => init());
