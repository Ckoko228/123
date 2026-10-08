function validateContactRequest(req, res, next) {
  const {
    name,
    phone,
    email,
    service_type,
    message,
    personal_data_consent
  } = req.body;

  if (
    !name ||
    !phone ||
    !email ||
    !service_type ||
    !message ||
    !personal_data_consent
  ) {
    return res.status(400).json({
      message: 'Все обязательные поля должны быть заполнены'
    });
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: 'Некорректный email'
    });
  }

  const phoneRegex =
    /^\+?[0-9\s\-()]{7,20}$/;

  if (!phoneRegex.test(phone)) {
    return res.status(400).json({
      message: 'Некорректный номер телефона'
    });
  }

  next();
}

module.exports = {
  validateContactRequest
};