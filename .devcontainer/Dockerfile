ARG USERNAME=ubuntu

FROM cfxdevkit/devkit-cli:latest AS devkit-nvm
USER root
RUN mkdir /opt/nvm
ENV NVM_DIR /opt/nvm
ENV NODE_VERSION v22.12.0
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
RUN /bin/bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use --delete-prefix $NODE_VERSION"
ENV NODE_PATH $NVM_DIR/versions/node/$NODE_VERSION/bin
ENV PATH $NODE_PATH:$PATH

ARG USERNAME=ubuntu
FROM devkit-nvm AS devkit-hardhat
# Set the user to $USERNAME immediately
USER $USERNAME

# Add the required configurations
RUN printf '%s\n' \
'if [ -t 0 ] && [ -z "${HARDHAT_VAR_DEPLOYER_MNEMONIC}" ]; then' \
'    HARDHAT_VAR_DEPLOYER_MNEMONIC=$(devkit wallet show)' \
'    if [ $? -eq 0 ] && [ -n "${HARDHAT_VAR_DEPLOYER_MNEMONIC}" ]; then' \
'        export HARDHAT_VAR_DEPLOYER_MNEMONIC' \
'    else' \
'        echo "Failed to retrieve mnemonic or mnemonic is empty" >&2' \
'    fi' \
'fi' >> /home/${USERNAME}/.bashrc
RUN npm install -g npm@latest
RUN npm install --global hardhat-shorthand \
    && yes | hardhat-completion install
