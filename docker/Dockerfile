FROM ubuntu:22.04
ENV DEBIAN_FRONTEND=noninteractive
ENV DISPLAY=:1
RUN apt-get update && apt-get install -y xvfb x11vnc openbox feh firefox lxterminal pcmanfm mousepad galculator python3 fonts-noto-color-emoji fonts-liberation dbus-x11 supervisor curl --no-install-recommends && rm -rf /var/lib/apt/lists/*
RUN mkdir -p /opt/kuroos /usr/share/backgrounds/kuroos /root/.config/openbox /var/lib/openbox /var/log/supervisor
EXPOSE 5901
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
COPY supervisord.conf /etc/supervisor/conf.d/
COPY launcher.py /opt/kuroos/
COPY desktop.html /opt/kuroos/
COPY wallpaper.svg /usr/share/backgrounds/kuroos/
COPY autostart /root/.config/openbox/
RUN chmod +x /opt/kuroos/launcher.py
LABEL version="alpha-0.1"
