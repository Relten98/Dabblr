function main() {
    $("#submit-article").click(function(event) {
        event.preventDefault();
        console.log("Value:", $("#input-article").val());
    });
    
}

main();