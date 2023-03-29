const { spawn } = require("child_process");

const recommendMeal = (processedInput) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn(
      "python",
      ["./ModelProcessing.py", processedInput],
      {
        env: {
          PATH: process.env.PATH,
          PYTHONPATH: process.env.PYTHONPATH,
          PYTHONIOENCODING: "UTF-8",
          PYTHONUNBUFFERED: "1",
          PY_PYTHON: "python3",
        },
      }
    );

    let output = "";

    pythonProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      reject(data.toString());
    });

    pythonProcess.on("exit", (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(`Child process exited with code ${code}`);
      }
    });
  });
};

module.exports = recommendMeal;
