import { TranslateTaskProcessor } from "../../utils/task";

export default <TranslateTaskProcessor>async function (data) {
  const param = `${data.langfrom.toUpperCase().replace("-", "_")}2${data.langto
    .toUpperCase()
    .replace("-", "_")}`;

  const xhr = await Zotero.HTTP.request(
    "GET",
    `http://fwj-win-server.atomse.net:8900/translate&content=${encodeURIComponent(
      data.raw,
    )}`,
    { responseType: "json" },
  );
  if (xhr?.status !== 200) {
    throw `Request error: ${xhr?.status}`;
  }

  const res = xhr.response.translateResult;
  let tgt = "";
  for (const i in res) {
    for (const j in res[i]) {
      tgt += res[i][j].tgt;
    }
  }
  data.result = tgt;
};
