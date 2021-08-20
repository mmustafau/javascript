//generate edilen cookie kodudur. front end de kullanılmaz. sadece geliştirme için burada tutuluyor. Bu dosya encode edilip backende aktarılıyor. by mustafa.unlu
var link = document.createElement("link");
link.href = "https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v2.4.7/dist/cookieconsent.css";
link.type = "text/css";
link.rel = "stylesheet";
link.media = "screen,print";

document.getElementsByTagName("head")[0].appendChild(link);

var script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v2.4.7/dist/cookieconsent.js";

document.getElementsByTagName("head")[0].appendChild(script);

function cookieCheck() {

    let kivuzCookie = getCookie("kivuzCookie");

    if (kivuzCookie === undefined) {
        getMyCookieConfFromKivuz();
    } else {
        deleteForbiddenCookies(kivuzCookie)
    }
}

async function getMyCookieConfFromKivuz() {
    let resStatus = "";
    let resOk = false;
    const domainName= window.location.hostname
    let response = await fetch("http://test.kivuz.com/api/cookie/tumunu-getir-disardan/"+domainName)
        .then(resp => {
            resStatus = resp.status;
            resOk = resp.ok;
            return resOk && resStatus !== 500 ? resp.json() : resp
        })
        .then((resp) => {
            if (resOk) {
                return resp.data;
            } else {
                return console.log("cookie err: ", resp)
            }

        }).catch((e) =>
            console.log("cookie err: ", e));
    showModalToChooseCookieSettings(response)

}

function deleteForbiddenCookies(kivuzCookie) {

    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        const allowedCookie = kivuzCookie.split(",")

        if ( name.trim().toString() !=="kivuzCookie" && !allowedCookie.includes(name.trim().toString())) {
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }


    }
}

function showModalToChooseCookieSettings(newCookieConf) {

    var cookieconsent = initCookieConsent();

    cookieconsent.run({
        current_lang: 'tr',
        onAccept: function (cookie) {
            setCookie("kivuzCookie", cookie.level, 365)
            // do something ...
        },

        languages: {
            en: {
                consent_modal: {
                    title: "Cookie(Çerez) Yönetimi ",
                    description: 'Size daha iyi hizmet sunabilmek için cookie (çerez) kullanımı yapılmaktadır. ',
                    primary_btn: {
                        text: 'Kabul Et',
                        role: 'accept_all'  //'accept_selected' or 'accept_all'
                    },
                    secondary_btn: {
                        text: 'Ayarlar',
                        role: 'settings'   //'settings' or 'accept_necessary'
                    }
                },
                settings_modal: {
                    title: 'Cookie(Çerez) Ayarları',
                    save_settings_btn: "Ayarları Kaydet",
                    accept_all_btn: "Tümünü Kabul Et",
                    close_btn_label: "Close",

                    blocks: newCookieConf.map((item) => {

                        return {
                            title: item.name,
                            description: item.aciklama,
                            toggle: {
                                value: item.name,
                                enabled: !item.zorunlu,
                                readonly: item.zorunlu
                            }
                        }
                    })

                }
            }
        }
    });

}

function getCookie(name) {

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(name, value, days) {

    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

window.addEventListener("load", function () {
    cookieCheck()
});

