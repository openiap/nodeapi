FROM node:lts-alpine
ENV NODE_ENV production
RUN apk update
RUN apk add git
RUN addgroup -S openiapgroup && adduser -S openiapuser -G openiapgroup
# USER openiapuser
# WORKDIR /home/openiapuser
# COPY --chown=openiapuser:openiapgroup tsconfig.json /home/openiapuser/tsconfig.json
# COPY --chown=openiapuser:openiapgroup package.json /home/openiapuser/package.json
# RUN npm i
# COPY --chown=openiapuser:openiapgroup src /home/openiapuser/src
# COPY --chown=openiapuser:openiapgroup proto /home/openiapuser/proto
# COPY --chown=openiapuser:openiapgroup lib /home/openiapuser/lib
USER openiapuser
WORKDIR /tmp
COPY --chown=openiapuser:openiapgroup tsconfig.json /tmp/tsconfig.json
COPY --chown=openiapuser:openiapgroup package.json /tmp/package.json
RUN npm i
COPY --chown=openiapuser:openiapgroup src /tmp/src
COPY --chown=openiapuser:openiapgroup proto /tmp/proto
COPY --chown=openiapuser:openiapgroup lib /tmp/lib
RUN rm -rf /tmp/.npm
# CMD [ "/usr/local/bin/npm", "run", "agent" ]
ENV SKIP_XVFB=True
ENV HOME=.
# RUN npm config set cache "/tmp/.npm-cache" --global
# CMD ["npm", "run", "agent"]
CMD ["node", "./lib/agent.js"]

