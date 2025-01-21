emailjs.init('x8loTAwaMYs4YEDfW')

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const location = document.getElementById('location').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const description = document.getElementById('description').value;

    emailjs.send("service_7ajc56h","template_f21ihvr", {
        name: name,
        date: date,
        location: location,
        email: email,
        phone: phone,
        description: description
    })
    .then(function(response) {
        alert('Your message has been sent successfully!', response.status, response.text);
    }, function(error) {
        alert('Failed to send your message. Please try again later.', error);
    });
});
