import { HardhatRuntimeEnvironment } from "hardhat/types";
// import { spawn } from "child_process";

export async function node(
    taskArguments: unknown,
    hre: HardhatRuntimeEnvironment,
    runSuper: unknown,
): Promise<void> {
      // const child = require("child_process").spawn('devkit', ["logs"], {
      //   cwd: process.cwd(),
      //   detached: false,
      //   shell: true,
      //   stdio: "inherit"
      // });
      // child.kill()


      // const child_process = require('child_process');

      // process.stdin.setRawMode(true);
      // // process.stdin.on("data", (data) => {});

      // var child = child_process.spawn('devkit', ["start", "--scan"], {stdio: "inherit"});
      // child.on("exit", (e, code) => {
      //   process.exit();
      // });

      const { spawnSync } = require('child_process');

      // Define the command and arguments
      const command = 'devkit'; // Replace this with the desired command
      const args = ["start"]; // Example arguments
      
      // Spawn the child process synchronously
      const result = spawnSync(command, args, {
          stdio: 'inherit', // Inherit stdio to show output directly in the console
      });
      
      // Handle the result of the child process
      if (result.error) {
          console.error(`Error occurred: ${result.error.message}`);
      } else {
          console.log(`Child process exited with code ${result.status}`);
      }
}
