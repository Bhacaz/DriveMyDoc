
export class DriveDocument {

  readonly id: string;
  readonly name: string;
  readonly mimeType: string;
  readonly parents: string[];
  readonly webViewLink: string;
  readonly iconLink: string;

  constructor(
  id: string,
  name: string,
  mimeType: string,
  parents: string[],
  webViewLink: string,
  iconLink: string
) {
    this.id = id;
    this.name = name;
    this.mimeType = mimeType;
    this.parents = parents;
    this.webViewLink = webViewLink;
    this.iconLink = iconLink;
  }

}
