export class ConvertData {
  async getAreaData(path: string) {
    const response = await fetch(`/data/${path}`);
    const json = await response.json();
    console.log(json);

    return json.response;
  }
}
