const { PDFParse } = require("pdf-parse");
const mammoth = require("mammoth");

const extractResumeText = async (file) => {
  const extension = file.originalname
    .split(".")
    .pop()
    .toLowerCase();

  if (extension === "pdf") {
    const parser = new PDFParse({ data: file.buffer });

    try {
      const result = await parser.getText();
      return result.text;
    } finally {
      await parser.destroy();
    }
  }

  if (extension === "docx") {
    const result = await mammoth.extractRawText({
      buffer: file.buffer,
    });

    return result.value;
  }

  if (extension === "txt") {
    return file.buffer.toString("utf-8");
  }

  throw new Error("Unsupported file format");
};

module.exports = extractResumeText;