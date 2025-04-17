# ANT Bus Booking Website

A modern, responsive bus booking website built with React and Vite. Features include a beautiful UI, booking functionality, and email integration.

## Features

- 🎨 Modern, responsive design
- 📱 Mobile-friendly interface
- 🚌 Bus booking system
- 📧 Email notification system
- ⚡ Fast loading and performance
- 🎯 User-friendly interface

## Tech Stack

- React
- Vite
- Tailwind CSS
- EmailJS

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/antbus.git
cd antbus
```

2. Install dependencies:
```bash
npm install
```

3. Set up EmailJS:
- Sign up at [EmailJS](https://www.emailjs.com/)
- Create an email service
- Create an email template
- Update the credentials in `src/App.jsx`

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Environment Variables

Create a `.env` file in the root directory and add your EmailJS credentials:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 