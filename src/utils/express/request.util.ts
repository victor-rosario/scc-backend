import { IDeviceInfo } from "./express-util.interface";

export const parseUserAgent = async (userAgent: string): Promise<IDeviceInfo> => {
    const deviceInfo: IDeviceInfo = {};

    // Extract OS information asynchronously
    deviceInfo.os = await findMatchAsync(osKeywords, userAgent);

    // Extract browser information asynchronously
    deviceInfo.browser = await findMatchAsync(browserKeywords, userAgent);

    // Extract device information asynchronously
    deviceInfo.device = await findMatchAsync(deviceKeywords, userAgent);

    return deviceInfo;
};

const findMatchAsync = async (keywords: { name: string; keyword: string }[], userAgent: string): Promise<string | undefined> => {
    for (const keyword of keywords) {
        const regex = new RegExp(keyword.keyword);
        if (regex.test(userAgent)) {
            return keyword.name;
        }
    }
    return undefined;
};

const osKeywords = [
    { name: 'Windows', keyword: 'Windows' },
    { name: 'Macintosh', keyword: 'Macintosh' },
    { name: 'Linux', keyword: 'Linux' },
    { name: 'Android', keyword: 'Android' },
    { name: 'iOS', keyword: 'iPhone|iPad' },
    { name: 'BlackBerry', keyword: 'BlackBerry' },
    { name: 'PlayStation', keyword: 'PlayStation' },
    { name: 'Nintendo', keyword: 'Nintendo' },
    { name: 'Xbox', keyword: 'Xbox' },
    { name: 'FreeBSD', keyword: 'FreeBSD' },
    { name: 'OpenBSD', keyword: 'OpenBSD' },
    { name: 'NetBSD', keyword: 'NetBSD' },
    { name: 'DragonFly BSD', keyword: 'DragonFly' },
    { name: 'UNIX', keyword: 'UNIX' },
];

const browserKeywords = [
    { name: 'Firefox', keyword: 'Firefox' },
    { name: 'Edge', keyword: 'Edge' },
    { name: 'Internet Explorer', keyword: 'IE' },
    { name: 'Opera Mini', keyword: 'Opera Mini' },
    { name: 'Opera Touch', keyword: 'Opera Touch' },
    { name: 'Opera GX', keyword: 'Opera GX' },
    { name: 'Opera', keyword: 'Opera' },
    { name: 'Chrome', keyword: 'Chrome' },
    { name: 'Chrome', keyword: 'Google Chrome' },
    { name: 'Safari', keyword: 'Safari' },
    { name: 'Yandex Browser', keyword: 'YaBrowser' },
    { name: 'UC Browser', keyword: 'UCBrowser' },
    { name: 'Chrome iOS', keyword: 'CriOS' },
];

const deviceKeywords = [
    { name: 'iPhone', keyword: 'iPhone' },
    { name: 'iPad', keyword: 'iPad' },
    { name: 'Android Device', keyword: 'Android' },
    { name: 'BlackBerry', keyword: 'BlackBerry' },
    { name: 'PlayStation', keyword: 'PlayStation' },
    { name: 'Nintendo', keyword: 'Nintendo' },
    { name: 'Xbox', keyword: 'Xbox' },
    { name: 'Windows Phone', keyword: 'Windows Phone' },
    { name: 'Google TV', keyword: 'GoogleTV' },
    { name: 'Kindle', keyword: 'Kindle|Silk' },
    { name: 'Smart TV', keyword: 'SMART-TV' },
    { name: 'Apple TV', keyword: 'AppleTV' },
    { name: 'Chromecast', keyword: 'CrKey|Cast' },
    { name: 'Mac', keyword: 'Macintosh' },
];