export class EtchedIcon {
  constructor(container, type, size) {
    this.container = container;
    this.type = type;
    this.size = size;
    this.rotation = { x: -25, y: 0 };
    this.build();
    this.animate();
  }

  build() {
    this.scene = document.createElement('div');
    this.scene.style.cssText = 'width:' + this.size + 'px;height:' + this.size + 'px;perspective:' + (this.size * 4) + 'px;-webkit-perspective:' + (this.size * 4) + 'px';
    this.group = document.createElement('div');
    this.group.style.cssText = 'width:100%;height:100%;position:relative;transform-style:preserve-3d;-webkit-transform-style:preserve-3d';

    var t = this.type;
    if (t === 'keyboard') { this.buildKeyboard(); }
    else if (t === 'terminal') { this.buildTerminal(); }
    else if (t === 'expand') { this.buildExpand(); }
    else if (t === 'refresh') { this.buildRefresh(); }
    else if (t === 'home') { this.buildHome(); }
    else if (t === 'chat') { this.buildChat(); }
    else { this.buildCube(); }

    this.scene.appendChild(this.group);
    this.container.appendChild(this.scene);
  }

  box(x, y, z, w, h, d, dark) {
    var el = document.createElement('div');
    el.style.cssText = 'position:absolute;left:50%;top:50%;width:' + w + 'px;height:' + h + 'px;margin-left:' + (-w/2) + 'px;margin-top:' + (-h/2) + 'px;transform-style:preserve-3d;-webkit-transform-style:preserve-3d;transform:translate3d(' + x + 'px,' + y + 'px,' + z + 'px);-webkit-transform:translate3d(' + x + 'px,' + y + 'px,' + z + 'px)';
    var c = dark ? ['#3d5a75','#4a6b8a','#354d63','#436480','#517291','#5a7d9c'] : ['#c5ddf2','#e8f4ff','#b8d4eb','#d4e8f9','#dceefb','#f0f9ff'];
    var r = Math.min(w,h,d) * 0.1;
    var faces = [[0,0,d/2,w,h,c[1]],[0,180,d/2,w,h,c[0]],[0,-90,w/2,d,h,c[2]],[0,90,w/2,d,h,c[3]],[-90,0,h/2,w,d,c[4]],[90,0,h/2,w,d,c[5]]];
    for (var i = 0; i < faces.length; i++) {
      var f = faces[i];
      var face = document.createElement('div');
      face.style.cssText = 'position:absolute;width:' + f[3] + 'px;height:' + f[4] + 'px;left:' + ((w-f[3])/2) + 'px;top:' + ((h-f[4])/2) + 'px;background:' + f[5] + ';transform:rotateX(' + f[0] + 'deg)rotateY(' + f[1] + 'deg)translateZ(' + f[2] + 'px);-webkit-transform:rotateX(' + f[0] + 'deg)rotateY(' + f[1] + 'deg)translateZ(' + f[2] + 'px);border-radius:' + r + 'px';
      if (!dark && f[0] === 0 && f[1] === 0) {
        var shine = document.createElement('div');
        shine.style.cssText = 'position:absolute;width:45%;height:20%;left:20%;top:12%;background:linear-gradient(180deg,rgba(255,255,255,0.8),transparent);border-radius:50%';
        face.appendChild(shine);
      }
      el.appendChild(face);
    }
    return el;
  }

  accent(x, y, z, w, h, d) {
    this.group.appendChild(this.box(x, y, z, w, h, d, true));
    // back removed
  }

  buildKeyboard() {
    var u = this.size / 14;
    this.group.appendChild(this.box(0, 0, 0, u*11, u*5, u*2, false));
    this.accent(-u*3, -u*0.5, u*1.2, u*2, u*1.4, u*0.6);
    this.accent(0, -u*0.5, u*1.2, u*2, u*1.4, u*0.6);
    this.accent(u*3, -u*0.5, u*1.2, u*2, u*1.4, u*0.6);
    this.accent(-u*1.5, u*1.3, u*1.2, u*2, u*1.4, u*0.6);
    this.accent(u*1.5, u*1.3, u*1.2, u*2, u*1.4, u*0.6);
  }

  buildTerminal() {
    var u = this.size / 14;
    this.group.appendChild(this.box(0, 0, 0, u*11, u*8, u*2, false));
    this.accent(0, 0, u*1.2, u*9, u*6, u*0.4);
    this.group.appendChild(this.box(-u*2, -u*1.5, u*1.3, u*3, u*0.6, u*0.3, false));
  }

  buildExpand() {
    var u = this.size / 14;
    this.group.appendChild(this.box(0, 0, 0, u*9, u*9, u*1.5, false));
    var corners = [[-1,-1],[1,-1],[-1,1],[1,1]];
    for (var i = 0; i < corners.length; i++) {
      var cx = corners[i][0], cy = corners[i][1];
      this.accent(cx*u*2.8, cy*u*2.8, u*0.9, u*2, u*0.7, u*0.4);
      this.accent(cx*u*3.2, cy*u*2.3, u*0.9, u*0.7, u*1.7, u*0.4);
    }
  }

  buildRefresh() {
    var u = this.size / 14;
    for (var i = 0; i < 6; i++) {
      var a = (i/6) * Math.PI * 1.6 - Math.PI * 0.8;
      this.group.appendChild(this.box(Math.cos(a)*u*3, Math.sin(a)*u*3, 0, u*2.2, u*2.2, u*1.8, false));
    }
    this.accent(u*1.5, -u*4, u*1, u*1.8, u*1.5, u*0.8);
    this.accent(u*3.5, -u*2.5, u*1, u*1.5, u*1.8, u*0.8);
  }

  buildHome() {
    var u = this.size / 14;
    this.group.appendChild(this.box(0, u*2, 0, u*7, u*5, u*4, false));
    this.group.appendChild(this.box(0, -u*1.5, 0, u*9, u*3, u*5, false));
    this.accent(0, u*3, u*2.2, u*2.2, u*3.5, u*0.4);
    this.accent(-u*2, u*1.5, u*2.2, u*1.5, u*1.5, u*0.4);
  }

  buildChat() {
    var u = this.size / 16;
    this.group.appendChild(this.box(0, -u, 0, u*10, u*6, u*4, false));
    this.accent(-u*2.5, -u*2.5, u*2.2, u*1.2, u*3, u*0.8);
    this.accent(0, -u*2, u*2.2, u*1.2, u*2.2, u*0.8);
    this.accent(u*2.5, -u*2.3, u*2.2, u*1.2, u*2.6, u*0.8);
    this.group.appendChild(this.box(-u*3, u*4, 0, u*2.5, u*2.5, u*2.5, false));
  }

  buildCube() {
    var u = this.size / 18;
    var cs = u * 8, th = u * 1.4, h = cs / 2;
    var edges = [[0,-h,h,cs,th,th],[0,h,h,cs,th,th],[-h,0,h,th,cs,th],[h,0,h,th,cs,th],[0,-h,-h,cs,th,th],[0,h,-h,cs,th,th],[-h,0,-h,th,cs,th],[h,0,-h,th,cs,th],[-h,-h,0,th,th,cs],[h,-h,0,th,th,cs],[-h,h,0,th,th,cs],[h,h,0,th,th,cs]];
    for (var i = 0; i < edges.length; i++) {
      var e = edges[i];
      this.group.appendChild(this.box(e[0], e[1], e[2], e[3], e[4], e[5], false));
    }
    var os = u * 4.5;
    var orb = document.createElement('div');
    orb.style.cssText = 'position:absolute;left:50%;top:50%;width:' + os + 'px;height:' + os + 'px;margin-left:' + (-os/2) + 'px;margin-top:' + (-os/2) + 'px;border-radius:50%;background:radial-gradient(ellipse at 30% 25%,#fff 0%,#f3e8ff 10%,#d8b4fe 30%,#a855f7 55%,#7c3aed 80%,#6d28d9 100%);box-shadow:0 0 ' + (os*0.5) + 'px rgba(168,85,247,0.7),inset 0 -' + (os*0.1) + 'px ' + (os*0.2) + 'px rgba(109,40,217,0.5)';
    var hl = document.createElement('div');
    hl.style.cssText = 'position:absolute;width:35%;height:20%;left:20%;top:15%;background:linear-gradient(180deg,rgba(255,255,255,0.9),transparent);border-radius:50%';
    orb.appendChild(hl);
    this.group.appendChild(orb);
  }

  animate() {
    var self = this;
    var isCube = this.type === 'cube';
    var y = Math.random() * 360;
    var bob = 0;
    var spd = isCube ? 2 + Math.random() * 2 : 0;
    var dir = Math.random() > 0.5 ? 1 : -1;
    var phase = 'spin';
    var wait = 0;

    function tick() {
      if (isCube) {
        if (phase === 'spin') {
          y += spd * dir; if (y > 45) { y = 45; dir = -1; } if (y < -45) { y = -45; dir = 1; }
          spd *= 0.985;
          if (spd < 0.1) { phase = 'wait'; wait = 80 + Math.random() * 120; }
        } else {
          wait--;
          if (wait <= 0) { phase = 'spin'; spd = 2.5 + Math.random() * 3; dir = Math.random() > 0.5 ? 1 : -1; }
        }
      } else {
        y += 0.15; if (y > 30) dir = -1; if (y < -30) dir = 1; y += dir * 0.001; if (y > 45) y = 45; if (y < -45) y = -45;
        bob += 0.035;
      }
      var ty = isCube ? 0 : Math.sin(bob) * 1.5;
      self.group.style.transform = self.group.style.webkitTransform = 'rotateX(' + self.rotation.x + 'deg)rotateY(' + y + 'deg)translateY(' + ty + 'px)';
      requestAnimationFrame(tick);
    }
    tick();
  }
}
