var data;
$.post("get.php", { index: null }, function(result) {
    data = result;
});

function notify(div, text) {
    let div0 = document.createElement('div');
    div0.setAttribute('class', 'notification');
    let div3 = document.createElement('div');
    div3.setAttribute('class', 'text');
    div3.innerHTML = text;
    div0.appendChild(div3);
    div.appendChild(div0);
    div0.style.top = 0 + 'px';
    setTimeout(() => {
        div0.innerHTML = '';
        div0.classList.remove('notification');
    }, 9000);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
var shema;
var mail;
var userData;
var section_name;

function removeMain() {
    var main = document.getElementById("main");
    main.innerHTML = "";
}

function getDate() {
    let date = new Date();
    date = date.toString().split(' ');
    let newDate = '';
    for (let i = 0; i < 5; i++) {
        newDate += ' ' + date[i];
    }
    return newDate;
}

var rRound = (x) => {
    return (Math.round(x * 100) / 100).toFixed(2);
}

function edit(x) {
    $('#' + x).addClass("edit");
    setTimeout(() => {
        $('#' + x).removeClass("edit");
    }, 620);
}

function css(element, property) {
    return window.getComputedStyle(element, null).getPropertyValue(property);
}
const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    if (s.length == 2) return s.toUpperCase();
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

function toKey(e) {
    e = e.toLowerCase();
    while (e.indexOf(" ") != -1) {
        e = e.replace(" ", "");
    }
    e = e.replace(/[^A-Za-z0-9]/g, '');
    return e;
}

function app() {
    function upadatedata() {
        $.post("post.php", { email: this.mail, key: this.key, data: JSON.stringify(this.xx), op: this.op != null ? this.op : '' });
    }

    function init(x, y, z, w, d, g) {
        this.op = g;
        this.key = d;
        this.ids = [];
        this.mail = w;
        this.name = x;
        this.upadateData = upadatedata;
        if (y) {
            this.module = y.option;
        }
        this.cfbase = [];
        this.checkMoy = checkmoy;
        this.checkUpdate = checkupdate;
        this.checkMod = checkmod;
        this.checkMat = checkmat;
        this.saveNote = savenote;
        this.inputChange = inputchange;
        if (z == null) {
            this.xx = {};
            this.b = base;
            this.b();
            this.d = draw(this.xx);
            this.d;
            this.cf = fncfbase;
            this.cf();

        } else {
            this.xx = z;
            this.d = draw(this.xx);
            this.d;
            this.cf = fncfbase;
            this.cf();
            this.id = idS;
            this.id();
            for (let i in this.ids) {
                setTimeout(() => {
                    this.inputChange(this.ids[i]);
                }, 300);
            }
        }
    }
    this.__init__ = init;

    function idS() {
        for (let i in this.xx.data) {
            for (let j in this.xx.data[i].data) {
                for (let k in this.xx.data[i].data[j].has) {
                    this.ids.push(i.charAt(i.length - 1) + j.charAt(j.length - 1) + k)
                }
            }
        }
    }

    function checkmoy() {
        let coef = 0;
        let mo = 0;
        let m = [];
        for (let i in this.xx.data) {
            for (j in this.xx.data[i].data) {
                let so = 0;
                let x = [];
                for (k in this.xx.data[i].data[j].has) {
                    if (this.xx.data[i].data[j][this.xx.data[i].data[j].has[k].toLowerCase()] != null) {
                        x.push(parseFloat(this.xx.data[i].data[j][this.xx.data[i].data[j].has[k].toLowerCase()]) * parseFloat(this.cfbase[parseInt(i.charAt(i.length - 1))][parseInt(j.charAt(j.length - 1))][k]));
                        continue;
                    } else {
                        return false;
                    }
                }
                for (let l in x) {
                    so = parseFloat(so) + parseFloat(x[l]);
                }
                so = rRound(parseFloat(so) * parseFloat(this.cfbase[parseInt(i.charAt(i.length - 1))][parseInt(j.charAt(j.length - 1))][this.xx.data[i].data[j].has.length]));
                coef = parseFloat(coef) + parseFloat(parseFloat(this.cfbase[parseInt(i.charAt(i.length - 1))][parseInt(j.charAt(j.length - 1))][this.xx.data[i].data[j].has.length]));
                m.push(so);
            }
        }
        for (let x in m) {
            mo = parseFloat(mo) + parseFloat(m[x]);
        }
        let moyen = document.getElementById('moyen');
        mo = rRound(mo / coef);
        if (mo >= 10)
            $('head').append('<style>.moyen span::before {content: attr(data-moyen);position: absolute;display: flex;left: 0;top: 0;width: 100%;height: 100%;color: var(--success);-webkit-text-stroke: 0.3vw var(--success);border-right: 3px solid rgb(255, 80, 0);overflow: hidden;animation: animate 6s linear infinite;}</style>');
        else
            $('head').append('<style>.moyen span::before {content: attr(data-moyen);position: absolute;display: flex;left: 0;top: 0;width: 100%;height: 100%;color: var(--faild);-webkit-text-stroke: 0.3vw var(--faild);border-right: 3px solid rgb(255, 80, 0);overflow: hidden;animation: animate 6s linear infinite;}</style>');

        moyen.setAttribute('data-moyen', mo);
        moyen.innerHTML = mo;

    }



    function checkupdate(id) {
        let m = 0;
        for (let i = 0; i < this.cfbase[id[0]][id[1]].length - 1; i++) {
            m = rRound(parseFloat(m) + this.xx.data['module' + id[0]].data['mat' + id[1]][this.xx.data['module' + id[0]].data['mat' + id[1]].has[i].toLowerCase()] * parseFloat(this.cfbase[id[0]][id[1]][i]));
        }
        let f = document.getElementById('m' + id.slice(0, id.length - 1));
        let t = document.getElementById('tmat' + id.slice(0, id.length - 1));
        let r = document.getElementById('c' + id.slice(0, id.length - 1));
        if (m >= 10) {
            t.style.color = 'var(--success)';
            edit('td' + id.slice(0, id.length - 1));
            r.innerHTML = this.xx.data['module' + id[0]].data['mat' + id[1]].cr;
            edit('tdm' + id.slice(0, id.length - 1));
        } else {
            r.innerHTML = "0";
            t.style.color = 'var(--faild)';
            edit('tdm' + id.slice(0, id.length - 1));
        }
        f.innerHTML = m;
    }


    function checkmod(id) {
        let m = [];
        for (let i in this.xx.data['module' + id[0]].data) {
            let x = [];
            for (let j in this.xx.data['module' + id[0]].data[i].has) {
                if (this.xx.data['module' + id[0]].data[i][this.xx.data['module' + id[0]].data[i].has[j].toLowerCase()] != null) {
                    x.push(this.xx.data['module' + id[0]].data[i][this.xx.data['module' + id[0]].data[i].has[j].toLowerCase()]);
                    continue;
                } else {
                    return false;
                }
            }
            m.push(x);
        }
        let so = 0;
        let scf = 0;
        let cr = 0;
        for (i = 0; i < m.length; i++) {
            let o = 0;
            let cf = 0;
            for (j = 0; j < m[i].length; j++) {
                o = parseFloat(o) + m[i][j] * parseFloat(this.cfbase[id[0]][i][j]);
            }
            cf = parseFloat(this.cfbase[id[0]][i][this.cfbase[id[0]][i].length - 1]);
            scf += cf;
            so = parseFloat(so) + parseFloat(cf) * parseFloat(o);
            if (o >= 10) cr += this.xx.data['module' + id[0]].data['mat' + i].cr;
        }
        let mo = rRound(so / scf);
        let f = document.getElementById('m' + id.slice(0, id.length - 2));
        let t = document.getElementById('tmod' + id.slice(0, id.length - 2));
        let r = document.getElementById('c' + id.slice(0, id.length - 2));
        if (mo >= 10) {
            t.style.color = 'var(--success)';
            edit('tdm' + id.slice(0, id.length - 2));
            if (parseFloat(r.textContent) != parseFloat(cr)) {
                r.innerHTML = cr;
                edit('td' + id.slice(0, id.length - 2));
            }
        } else {
            t.style.color = 'var(--faild)';
            if (parseFloat(r.textContent) != parseFloat(cr)) {
                r.innerHTML = cr;
                edit('td' + id.slice(0, id.length - 2));
            }
            edit('tdm' + id.slice(0, id.length - 2));
        }
        f.innerHTML = mo;
        this.checkMoy();
    }


    function checkmat(id) {
        for (let i in this.xx.data['module' + id[0]].data['mat' + id[1]].has) {
            if (this.xx.data['module' + id[0]].data['mat' + id[1]][this.xx.data['module' + id[0]].data['mat' + id[1]].has[i].toLowerCase()] != null) {
                continue;
            } else {
                let moyen = document.getElementById('moyen');
                let mo = '--.--';
                $('head').append('<style>.moyen span::before {content: attr(data-moyen);position: absolute;display: flex;left: 0;top: 0;width: 100%;height: 100%;color: var(--normal);-webkit-text-stroke: 0.3vw var(--normal);border-right: 3px solid rgb(255, 80, 0);overflow: hidden;animation: animate 6s linear infinite;}</style>');
                moyen.setAttribute('data-moyen', '    ');
                moyen.innerHTML = mo;


                let f = document.getElementById('m' + id.slice(0, id.length - 1));
                let t = document.getElementById('tmat' + id.slice(0, id.length - 1));
                let r = document.getElementById('c' + id.slice(0, id.length - 1));
                t.style.color = 'var(--normal)';
                edit('td' + id.slice(0, id.length - 1));
                r.innerHTML = '-';
                edit('tdm' + id.slice(0, id.length - 1));
                f.innerHTML = '--.--';

                f = document.getElementById('m' + id.slice(0, id.length - 2));
                t = document.getElementById('tmod' + id.slice(0, id.length - 2));
                r = document.getElementById('c' + id.slice(0, id.length - 2));
                t.style.color = 'var(--normal)';
                edit('td' + id.slice(0, id.length - 1));
                edit('tdm' + id.slice(0, id.length - 2));
                r.innerHTML = '-';
                f.innerHTML = '--.--';
                return false;
            }
        }
        this.checkUpdate(id);
        this.checkMod(id);
    }


    function savenote(id, x) {
        if (x == null) {
            this.xx.data['module' + id[0]].data['mat' + id[1]][this.xx.data['module' + id[0]].data['mat' + id[1]].has[id[2]].toLowerCase()] = null;
            this.upadateData();
        } else {
            this.xx.data['module' + id[0]].data['mat' + id[1]][this.xx.data['module' + id[0]].data['mat' + id[1]].has[id[2]].toLowerCase()] = x;
            this.upadateData();
        }
    }


    function inputchange(id) {
        function isNumber(n) {
            if (!isNaN(n) && (n.toString().indexOf('.') <= 2 && n.toString().lastIndexOf('.') == n.toString().indexOf('.')) || n.toString().indexOf('.') == -1) {
                if (parseFloat(n) >= 0 && parseFloat(n) <= 20) {
                    return true;
                } else return false;
            } else return false;
        }
        let x = document.getElementById(id);
        if (isNumber(x.value)) {
            x.value = parseFloat(x.value);
            x = parseFloat(x.value);
            this.saveNote(id, x);
            this.checkMat(id);
        } else {
            x.value = '';
            x = null;
            this.saveNote(id, x);
            this.checkMat(id);
        }
    }


    function fncfbase() {
        for (let i in this.xx.data) {
            let m = [];
            for (let j in this.xx.data[i].data) {
                let n = [];
                for (k in this.xx.data[i].data[j].has) {
                    if (this.xx.data[i].data[j].has.length > 2) {
                        if (this.xx.data[i].data[j].has[k].toLowerCase() == 'tp') {
                            n.push(0.20);
                        } else if (this.xx.data[i].data[j].has[k].toLowerCase() == 'ds') {
                            n.push(0.10);
                        } else if (this.xx.data[i].data[j].has[k].toLowerCase() == 'exman') {
                            n.push(0.7);
                        }
                    } else if (this.xx.data[i].data[j].has.length == 2) {
                        if (this.xx.data[i].data[j].has[k].toLowerCase() == 'tp') {
                            n.push(0.3);
                        } else if (this.xx.data[i].data[j].has[k].toLowerCase() == 'ds') {
                            n.push(0.3);
                        } else if (this.xx.data[i].data[j].has[k].toLowerCase() == 'exman') {
                            n.push(0.7);
                        }
                    } else if (this.xx.data[i].data[j].has.length == 1) {
                        if (this.xx.data[i].data[j].has[k].toLowerCase() == 'moyen') {
                            n.push(1);
                        }
                    }

                }
                n.push(this.xx.data[i].data[j].cf);
                m.push(n);

            }
            this.cfbase.push(m);
        }
    }

    function base() {
        let datalength = { "datalength": 0 };
        let k = [];
        let z = 0;
        this.xx.data = {};
        for (let i = 0; i < this.module.length; i++) {
            this.xx.data["module" + i] = { "name": this.module[i], "nbrMat": Object.keys(shema.data[toKey(this.module[i])].data).length, "cr": null, "cf": null, "data": {} };
            for (let j = 0; j < Object.keys(shema.data[toKey(this.module[i])].data).length; j++) {
                let f = 0;
                let n = {
                    ["mat" + j]: {
                        "name": shema.data[toKey(this.module[i])].mat[j],
                        "cf": shema.data[toKey(this.module[i])].data[toKey(shema.data[toKey(this.module[i])].mat[j])].cf,
                        "cr": shema.data[toKey(this.module[i])].data[toKey(shema.data[toKey(this.module[i])].mat[j])].cr
                    }
                };
                $.extend(this.xx.data["module" + i].data, n);
                this.xx.data["module" + i].data["mat" + j]["has"] = [];
                if (shema.data[toKey(this.module[i])].data[toKey(shema.data[toKey(this.module[i])].mat[j])].tp === 1) {
                    this.xx.data["module" + i].data["mat" + j]["tp"] = null;
                    this.xx.data["module" + i].data["mat" + j]["has"].push("TP");
                    ++f;
                }
                if (shema.data[toKey(this.module[i])].data[toKey(shema.data[toKey(this.module[i])].mat[j])].ds === 1) {
                    this.xx.data["module" + i].data["mat" + j].ds = null;
                    this.xx.data["module" + i].data["mat" + j]["has"].push("DS");
                    ++f;
                }
                if (shema.data[toKey(this.module[i])].data[toKey(shema.data[toKey(this.module[i])].mat[j])].tp === 0 && shema.data[toKey(this.module[i])].data[toKey(shema.data[toKey(this.module[i])].mat[j])].ds === 0) {
                    this.xx.data["module" + i].data["mat" + j].moyen = null;
                    this.xx.data["module" + i].data["mat" + j]["has"].push("MOYEN");
                    ++f;
                } else {
                    this.xx.data["module" + i].data["mat" + j].exman = null;
                    this.xx.data["module" + i].data["mat" + j]["has"].push("EXMAN");
                    ++f;
                }
                this.xx.data["module" + i].data["mat" + j]["datalength"] = f;
            }
            let v = 0;
            let cf = 0;
            let cr = 0;
            for (let b = 0; b < Object.keys(this.xx.data["module" + i].data).length; b++) {
                v += this.xx.data["module" + i].data["mat" + b].datalength;
                cf += this.xx.data["module" + i].data["mat" + b].cf;
                cr += this.xx.data["module" + i].data["mat" + b].cr;
            }
            this.xx.data["module" + i].datalength = v;
            this.xx.data["module" + i].cf = cf;
            this.xx.data["module" + i].cr = cr;
            datalength.datalength += v;
        }
        this.xx.name = this.name;
        $.extend(this.xx, datalength);
    }

    function draw(data) {
        removeMain();
        var main = document.getElementById('main');
        var table = document.createElement('table');
        var l = document.createElement('tr');
        var c = document.createElement('th');
        c.setAttribute('id', 'section');
        c.setAttribute('colspan', data.datalength);
        c.innerHTML = data.name;
        l.appendChild(c);
        table.appendChild(l);
        l = document.createElement('tr');
        for (let k in data.data) {
            c = document.createElement('th');
            if (k != Object.keys(data.data)[Object.keys(data.data).length - 1]) {
                c.setAttribute('class', 'module');
            }
            c.setAttribute('id', 'tmod' + k.charAt(k.length - 1));
            c.setAttribute('colspan', data.data[k].datalength);
            c.innerHTML = data.data[k].name;
            l.appendChild(c);
        }
        table.appendChild(l);
        l = document.createElement('tr');
        for (let k in data.data) {

            for (let j in data.data[k].data) {
                c = document.createElement('td');
                if (k != Object.keys(data.data)[Object.keys(data.data).length - 1]) {
                    if (j != Object.keys(data.data[k].data)[Object.keys(data.data[k].data).length - 1]) {
                        c.setAttribute('class', 'mat');
                    } else {
                        c.setAttribute('class', 'module');
                    }
                }
                if (k == Object.keys(data.data)[Object.keys(data.data).length - 1] && j != Object.keys(data.data[k].data)[Object.keys(data.data[k].data).length - 1]) {
                    c.setAttribute('class', 'mat');
                }
                c.setAttribute('id', 'tmat' + k.charAt(k.length - 1) + j.charAt(j.length - 1));
                c.setAttribute('colspan', data.data[k].data[j].datalength);
                c.innerHTML = data.data[k].data[j].name;
                l.appendChild(c);
            }
        }
        table.appendChild(l);
        l = document.createElement('tr');
        for (let k in data.data) {
            for (let j in data.data[k].data) {
                let cls;
                if (k != Object.keys(data.data)[Object.keys(data.data).length - 1]) {
                    if (j != Object.keys(data.data[k].data)[Object.keys(data.data[k].data).length - 1]) {
                        cls = 'mat';
                    } else {
                        cls = "module"
                    }
                }
                if (k == Object.keys(data.data)[Object.keys(data.data).length - 1] && j != Object.keys(data.data[k].data)[Object.keys(data.data[k].data).length - 1]) {
                    cls = 'mat';
                }
                for (v in data.data[k].data[j].has) {
                    c = document.createElement('td');
                    if (v == data.data[k].data[j].has.length - 1) {
                        if (cls) {
                            c.setAttribute('class', cls);
                        }
                    }
                    var f = data.data[k].data[j].has[v];
                    c.innerHTML = capitalize(f);
                    l.appendChild(c);
                }
            }
        }
        table.appendChild(l);
        l = document.createElement('tr');
        for (let k in data.data) {
            for (let j in data.data[k].data) {
                let cls;
                if (k != Object.keys(data.data)[Object.keys(data.data).length - 1]) {
                    if (j != Object.keys(data.data[k].data)[Object.keys(data.data[k].data).length - 1]) {
                        cls = 'mat';
                    } else {
                        cls = "module"
                    }
                }
                if (k == Object.keys(data.data)[Object.keys(data.data).length - 1] && j != Object.keys(data.data[k].data)[Object.keys(data.data[k].data).length - 1]) {
                    cls = 'mat';
                }
                for (v in data.data[k].data[j].has) {
                    c = document.createElement('td');
                    let i = document.createElement('input');
                    i.setAttribute('onchange', 'z.inputChange(\'' + k.charAt(k.length - 1) + j.charAt(j.length - 1) + v + '\');');
                    i.setAttribute('type', 'text');
                    i.setAttribute('id', k.charAt(k.length - 1) + j.charAt(j.length - 1) + v);
                    if (data.data[k].data[j][data.data[k].data[j].has[v].toLowerCase()] !== null && (parseFloat(data.data[k].data[j][data.data[k].data[j].has[v].toLowerCase()]) >= 0 && parseFloat(data.data[k].data[j][data.data[k].data[j].has[v].toLowerCase()]) <= 20)) {
                        i.value = data.data[k].data[j][data.data[k].data[j].has[v].toLowerCase()];
                    } else {
                        i.value = '';
                    }
                    if (v == data.data[k].data[j].has.length - 1) {
                        if (cls) {
                            c.setAttribute('class', cls);
                        }
                    }
                    c.appendChild(i);
                    l.appendChild(c);
                }
            }
        }
        table.appendChild(l);
        l = document.createElement('tr');
        for (let k in data.data) {
            for (let j in data.data[k].data) {
                c = document.createElement('td');
                if (k != Object.keys(data.data)[Object.keys(data.data).length - 1]) {
                    if (j != Object.keys(data.data[k].data)[Object.keys(data.data[k].data).length - 1]) {
                        c.setAttribute('class', 'info mat');
                    } else {
                        c.setAttribute('class', 'info module');
                    }
                }
                if (k == Object.keys(data.data)[Object.keys(data.data).length - 1] && j != Object.keys(data.data[k].data)[Object.keys(data.data[k].data).length - 1]) {
                    c.setAttribute('class', 'info mat');
                } else if (k == Object.keys(data.data)[Object.keys(data.data).length - 1] && j == Object.keys(data.data[k].data)[Object.keys(data.data[k].data).length - 1]) {
                    c.setAttribute('class', 'info');
                }
                c.setAttribute('colspan', data.data[k].data[j].datalength);
                c.setAttribute('id', 'td' + k.charAt(k.length - 1) + j.charAt(j.length - 1));
                let s1 = document.createElement('strong');
                s1.setAttribute('id', 'c' + k.charAt(k.length - 1) + j.charAt(j.length - 1));
                let s2 = document.createElement('strong');
                let s3 = document.createElement('strong');
                let p1 = document.createElement('p');
                let p2 = document.createElement('p');
                s1.innerHTML = '-';
                s2.innerHTML = data.data[k].data[j].cr;
                s3.innerHTML = data.data[k].data[j].cf;
                p1.innerHTML = 'Cr : ';
                p1.appendChild(s1);
                s1.insertAdjacentText('afterend', ' / ');
                p1.appendChild(s2);
                p2.innerHTML = 'Cf : ';
                p2.appendChild(s3);
                c.appendChild(p1);
                c.appendChild(p2);
                l.appendChild(c);
            }
        }
        table.appendChild(l);
        l = document.createElement('tr');
        for (let k in data.data) {
            for (let j in data.data[k].data) {
                c = document.createElement('td');
                if (k != Object.keys(data.data)[Object.keys(data.data).length - 1]) {
                    if (j != Object.keys(data.data[k].data)[Object.keys(data.data[k].data).length - 1]) {
                        c.setAttribute('class', 'info mat');
                    } else {
                        c.setAttribute('class', 'info module');
                    }
                }
                if (k == Object.keys(data.data)[Object.keys(data.data).length - 1] && j != Object.keys(data.data[k].data)[Object.keys(data.data[k].data).length - 1]) {
                    c.setAttribute('class', 'info mat');
                } else if (k == Object.keys(data.data)[Object.keys(data.data).length - 1] && j == Object.keys(data.data[k].data)[Object.keys(data.data[k].data).length - 1]) {
                    c.setAttribute('class', 'info');
                }
                c.setAttribute('colspan', data.data[k].data[j].datalength);
                c.setAttribute('id', 'tdm' + k.charAt(k.length - 1) + j.charAt(j.length - 1));
                let s1 = document.createElement('strong');
                let p1 = document.createElement('p');
                s1.innerHTML = '--.--';
                s1.setAttribute('id', 'm' + k.charAt(k.length - 1) + j.charAt(j.length - 1));
                p1.innerHTML = 'M : ';
                p1.appendChild(s1);
                c.appendChild(p1);
                l.appendChild(c);
            }
        }
        table.appendChild(l);
        l = document.createElement('tr');
        for (let k in data.data) {
            c = document.createElement('td');
            if (k != Object.keys(data.data)[Object.keys(data.data).length - 1]) {
                c.setAttribute('class', 'info module');
            } else {
                c.setAttribute('class', 'info');
            }
            c.setAttribute('colspan', data.data[k].datalength);
            c.setAttribute('id', 'td' + k.charAt(k.length - 1));
            let s1 = document.createElement('strong');
            s1.setAttribute('id', 'c' + k.charAt(k.length - 1));
            let s2 = document.createElement('strong');
            let s3 = document.createElement('strong');
            let p1 = document.createElement('p');
            let p2 = document.createElement('p');
            s1.innerHTML = '-';
            s2.innerHTML = data.data[k].cr;
            s3.innerHTML = data.data[k].cf;
            p1.innerHTML = 'Cr : ';
            p1.appendChild(s1);
            s1.insertAdjacentText('afterend', ' / ');
            p1.appendChild(s2);
            p2.innerHTML = 'Cf : ';
            p2.appendChild(s3);
            c.appendChild(p1);
            c.appendChild(p2);
            l.appendChild(c);
        }
        table.appendChild(l);
        l = document.createElement('tr');
        for (let k in data.data) {
            c = document.createElement('td');
            if (k != Object.keys(data.data)[Object.keys(data.data).length - 1]) {
                c.setAttribute('class', 'info module');
            } else {
                c.setAttribute('class', 'info');
            }
            c.setAttribute('colspan', data.data[k].datalength);
            let s1 = document.createElement('strong');
            s1.setAttribute('id', 'm' + k.charAt(k.length - 1));
            c.setAttribute('id', 'tdm' + k.charAt(k.length - 1));
            let p1 = document.createElement('p');
            s1.innerHTML = '--.--';
            p1.innerHTML = 'M : ';
            p1.appendChild(s1);
            c.appendChild(p1);
            l.appendChild(c);
        }
        table.appendChild(l);
        l = document.createElement('tr');
        c = document.createElement('td');
        c.classList.add('moyen');
        c.setAttribute('colspan', data.datalength);
        c.setAttribute('id', 'tdmoyen');
        let s = document.createElement('span');
        s.setAttribute('id', 'moyen');
        s.setAttribute('data-moyen', '    ');
        s.innerHTML = '--.--';
        c.appendChild(s);
        l.appendChild(c);
        table.appendChild(l);
        main.appendChild(table);
    }




}

function makeBlur() {
    var main = document.getElementById("main");
    main.classList.add("blur");
    main.classList.remove("main");
    var i = setInterval(blurIt, 20);
    var b = 8;

    function blurIt() {
        if (b <= 0) {
            clearInterval(i);
            main.classList.remove("blur");
            main.classList.add("main");
        } else {
            b -= 0.5;
            main.style.filter = "blur(" + b + "px)";
        }

    }
}

function makeChoice() {
    setTimeout(() => { choices(shema); }, 20);
}


function exitChoice(d) {
    removeMain();
    makeBlur();
    var spandown = scrolListBase();
    var div = document.getElementsByTagName("div")[0];
    arg = d.option;
    scrolList(div, arg)
    div.appendChild(spandown);
    $(document).ready(function() {
        three = document.getElementById("three");
        $("#up").click(function() {
            UpClick();
        });
        $("#down").click(function() {
            DownClick();
        });
        $("#three").click(function() {
            removeMain();
            makeBlur();
            var f = three.getAttribute("value");
            if (f.toLowerCase() == 'new') {
                shema = data;
                makeChoice();
            } else if (f.toLowerCase() == 'logout') {
                setCookie("email", mail, -1);
                location.reload();

            } else {
                section_name = d.data[f].name;
                userData = d.data[f];
                z = new app();
                z.__init__(section_name, shema, userData, mail, toKey(f), null);
            }

        });
    });
}


function choices(data) {
    removeMain();
    makeBlur();
    var spandown = scrolListBase();
    var div = document.getElementsByTagName("div")[0];
    arg = data.option;
    scrolList(div, arg)
    div.appendChild(spandown);
    $(document).ready(function() {
        three = document.getElementById("three");
        $("#up").click(function() {
            UpClick();
        });
        $("#one").click(function() {
            UpClick();
        });
        $("#two").click(function() {
            UpClick();
        });
        $("#four").click(function() {
            UpClick();
        });
        $("#five").click(function() {
            DownClick();
        });
        $("#down").click(function() {
            DownClick();
        });

        $("#three").click(function() {
            var f = three.getAttribute("value");
            if (Object.keys(shema.data).includes(f)) {
                if (Object.keys(shema.data[f]).includes("name")) section_name = shema.data[f].name;
                if (Object.keys(shema.data[f]).includes('module')) {
                    shema = shema.data[f].module;
                    z = new app();
                    var x = getDate();
                    removeMain();
                    makeBlur();
                    z.__init__(section_name, shema, userData, mail, toKey(x), x);
                } else {
                    if (Object.keys(shema.data[f]).includes('data')) {
                        removeMain();
                        makeBlur();
                        shema = shema.data[f];
                        makeChoice();
                    } else {
                        $(three).effect('shake');
                        notify(div, "COMMING SOON ..");
                    }
                }
            } else {
                $(three).effect('shake');
                notify(div, "COMMING SOON ..");
            }
        });
    });
}

function UpClick() {
    var t = [];
    t.push(document.getElementById("one"));
    t.push(document.getElementById("two"));
    t.push(document.getElementById("three"));
    t.push(document.getElementById("four"));
    t.push(document.getElementById("five"));
    for (i = 0; i < 5; i++) {
        if (t[3].textContent == "") break;
        if (t[i + 1]) {
            t[i].innerHTML = t[i + 1].textContent;
            t[i].setAttribute("number", t[i + 1].getAttribute("number"));
            t[i].setAttribute("value", t[i + 1].getAttribute("value"));
        } else {
            var x = eval(t[i - 1].getAttribute("number")) + 1;
            if (arg[x]) {
                t[i].innerHTML = arg[x];
                t[i].setAttribute("number", x);
                t[i].setAttribute("value", toKey(arg[x]));
            } else {
                t[i].innerHTML = "";
                t[i].setAttribute("number", "");
                t[i].setAttribute("value", "");
            }
        }
    }


}

function DownClick() {
    var t = [];
    t.push(document.getElementById("one"));
    t.push(document.getElementById("two"));
    t.push(document.getElementById("three"));
    t.push(document.getElementById("four"));
    t.push(document.getElementById("five"));
    for (i = 0; i < 5; i++) {
        if (t[1].textContent == "") break;
        if (t[4 - i - 1]) {
            t[4 - i].innerHTML = t[4 - i - 1].textContent;
            t[4 - i].setAttribute("number", t[4 - i - 1].getAttribute("number"));
            t[4 - i].setAttribute("value", t[4 - i - 1].getAttribute("value"));
        } else {
            var x = eval(t[0].getAttribute("number")) - 1;
            if (arg[x]) {
                t[4 - i].innerHTML = arg[x];
                t[4 - i].setAttribute("number", x);
                t[4 - i].setAttribute("value", toKey(arg[x]));
            } else {
                t[4 - i].innerHTML = "";
                t[4 - i].setAttribute("number", "");
                t[4 - i].setAttribute("value", "");
            }
        }
    }
}

function scrolListBase() {
    var main = document.getElementById("main");
    main.classList.remove("main");
    main.classList.add("main");
    var div = document.createElement("div");
    var spanup = document.createElement("span");
    var spandown = document.createElement("span");
    var iup = document.createElement("i");
    var idown = document.createElement("i");
    spanup.setAttribute("id", "up");
    spandown.setAttribute("id", "down");
    iup.setAttribute("class", "fas fa-chevron-up");
    idown.setAttribute("class", "fas fa-chevron-down");
    spanup.appendChild(iup);
    spandown.appendChild(idown);
    div.appendChild(spanup);
    main.appendChild(div);
    return spandown;
}

function scrolList(a, b) {
    var m = b.length > 5 ? 5 : b.length;
    var t = [];
    for (let i = 0; i < 5; i++) {
        var p = document.createElement("p");
        p.setAttribute("number", i);
        p.setAttribute("value", "");
        p.innerHTML = "";
        if (i == 0) {
            p.setAttribute("id", "one");
            p.setAttribute("class", "three");
        }
        if (i == 1) {
            p.setAttribute("id", "two");
            p.setAttribute("class", "two");
        }
        if (i == 2) {
            p.setAttribute("id", "three");
            p.setAttribute("class", "one");
        }
        if (i == 3) {
            p.setAttribute("id", "four");
            p.setAttribute("class", "two");
        }
        if (i == 4) {
            p.setAttribute("id", "five");
            p.setAttribute("class", "three");
        }
        t.push(p);
        a.appendChild(t[i]);
    }


    for (let i = 0; i < m; i++) {
        if (m == 2) {
            if (i == 0) {
                t[i + 1].setAttribute("value", toKey(b[0]));
                t[i + 1].innerHTML = b[i];
                continue;
            } else if (i == 1) {
                t[i + 1].setAttribute("value", toKey(b[1]));
                t[i + 1].innerHTML = b[i];
                break;
            }
        }
        if (m == 1) {
            t[2].setAttribute("value", toKey(b[0]));
            t[2].innerHTML = b[i];
            break;
        }
        if (i == 0 || i == 4) {
            t[i].setAttribute("value", toKey(b[i]));
            t[i].innerHTML = b[i];
        } else if (i == 1 || i == 3) {
            t[i].setAttribute("value", toKey(b[i]));
            t[i].innerHTML = b[i];
        } else if (i == 2) {
            t[i].setAttribute("value", toKey(b[i]));
            t[i].innerHTML = b[i];
        }
    }
}

function saisirMail() {
    var main = document.getElementById("main");
    var input = document.createElement("input");
    input.setAttribute("id", "mail");
    input.setAttribute("class", "valid");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "E-mail");
    main.appendChild(input);
    var mbtn = document.createElement("a");
    mbtn.setAttribute("id", "mbtn");
    mbtn.setAttribute("href", "#");
    main.appendChild(mbtn);
    var icon = document.createElement("i");
    icon.setAttribute("class", "fas fa-sign-in-alt");
    mbtn.appendChild(icon);
    var response;
    $(document).ready(function() {
        function isEmail(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        }
        $("#mbtn").click(function() {
            if (isEmail(document.getElementById("mail").value)) {
                mail = document.getElementById("mail").value;
                shema = data;
                $.post("get.php", { email: mail }, function(result) {
                    if (result.existe) {
                        result.data.option.push("New");
                        result.data.option.push("Logout");
                        exitChoice(result.data);
                        if (getCookie("email") != mail) {
                            setCookie('email', mail, 365);
                        }
                    } else {
                        setCookie('email', mail, 365);
                        makeChoice(shema);
                    }
                });

            } else {
                $("#mail").effect("shake");
            }
        })

    });

}


makeBlur();
var Cmail = getCookie("email");
if (Cmail != "") {
    $.post("get.php", { email: Cmail }, function(result) {
        if (result.existe) {
            mail = Cmail;
            result.data.option.push("New");
            result.data.option.push("Logout");
            exitChoice(result.data);
        } else {
            saisirMail();
        }
    });
} else {
    saisirMail();
}
