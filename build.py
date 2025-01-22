


import subprocess
import shutil
import os

import urllib.request



RED = '\033[31m'
GREEN = '\033[32m'
YELLOW = '\033[33m'
RESET = '\033[0m'

class InstallTools:
    @staticmethod
    def install_rust():
        print("This will install Rust...")

    @staticmethod
    def install_wasm_pack():
        print("This will install wasm-pack...")

    @staticmethod
    def install_node():
        print("attempting to install nodejs..")
        if shutil.which('nvm') is not None:
            print("using the installed version of nvm to install nodejs..")

            try:
                print("NVM installed. Installing Node.js...")
                subprocess.run(['nvm', 'install', 'node'], check=True)
                print("Node.js has been installed successfully!")
            except Exception as e:
                print(f"An error occurred while installing Node.js: {e}")
        else:
            nvm_install_url = "https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh"
            install_script_path = os.path.expanduser("~") + "/install_nvm.sh"

            try:
                print("downloading nvm install script...")
                urllib.request.urlretrieve(nvm_install_url, install_script_path)

                print("Running NVM install script...")
                subprocess.run(['bash', install_script_path], check=True)

                print("NVM installed. Installing Node.js...")
                subprocess.run(['nvm', 'install', 'node'], check=True)
                print("Node.js has been installed successfully!")
            except Exception as e:
                print(f"An error occurred while installing Node.js: {e}")
            finally:
                if os.path.exists(install_script_path):
                    os.remove(install_script_path)

class CheckTools:
    def __init__(self) -> None:
        self.is_rust_installed()
        self.is_wasm_pack_installed()
        self.is_node_installed()
        self.is_npm_installed()

    def is_rust_installed(self):
        if shutil.which('rustc') is not None:
            result = subprocess.run(['rustc', '--version'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            if result.returncode == 0:
                version = result.stdout.decode('utf-8').strip()
                print(f"{GREEN}Rust is installed!\nVersion: {version}{RESET}\n")
            else:
                print(f"{RED}Rust is not correctly installed{RESET}\n")
        else:
            print(f"{RED}Rust is not installed{RESET}\n")
            InstallTools.install_rust()


    def is_wasm_pack_installed(self):
        if shutil.which('wasm-pack') is not None:
            result = subprocess.run(['wasm-pack', '--version'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            if result.returncode == 0:
                version = result.stdout.decode('utf-8').strip()
                print(f"{GREEN}wasm-pack is installed!\nVersion: {version}{RESET}\n")
            else:
                print(f"{RED}wasm-pack is not correctly installed{RESET}\n")
        else:
            print(f"{RED}wasm-pack is not installed{RESET}\n")
            InstallTools.install_wasm_pack()


    def is_node_installed(self):
        if shutil.which('node') is not None:
            result = subprocess.run(['node', '--version'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            if result.returncode == 0:
                version = result.stdout.decode('utf-8').strip()
                print(f"{GREEN}Node.js is installed!\nVersion: {version}{RESET}\n")
            else:
                print(f"{RED}Node.js is not installed{RESET}\n")
                InstallTools.install_node()
        else:
            print(f"{RED}Node.js is not correctly installed{RESET}\n")
            InstallTools.install_node()



    def is_npm_installed(self):
        if shutil.which('npm') is not None:
            result = subprocess.run(['npm', '--version'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            if result.returncode == 0:
                version = result.stdout.decode('utf-8').strip()
                print(f"{GREEN}npm is installed\nVersion: {version}{RESET}\n")
            else:
                print(f"{RED}npm is not correctly installed{RESET}\n")
                InstallTools.install_node()
        else:
            print(f"{RED}npm is not installed{RESET}\n")
            InstallTools.install_node()

def main():
    CheckTools()

if __name__ == "__main__":
    main()
