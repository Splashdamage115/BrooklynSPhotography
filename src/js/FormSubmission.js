document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const location = document.getElementById('location').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const description = document.getElementById('description').value;

    const subject = `Photography Inquiry from ${name}`;
    const body = `Name: ${name}%0D%0A
                  Wedding Date: ${date}%0D%0A
                  Location: ${location}%0D%0A
                  Email: ${email}%0D%0A
                  Phone: ${phone}%0D%0A
                  Description: ${description}`;

    window.location.href = `mailto:davidstrik282@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
