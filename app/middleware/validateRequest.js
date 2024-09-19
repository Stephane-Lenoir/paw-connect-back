export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

export const fileRequest = (schema) => {
  return (req, res, next) => {
    if (req.file) {
      const { error: fileError } = schema.validate({
        mimetype: req.file.mimetype,
        size: req.file.size,
      });

      if (fileError) {
        console.log(fileError);
        return res.status(400).json({
          message: `Erreur de validation du fichier : ${fileError.details[0].message}`,
        });
      }
    }
    next();
  };
};
