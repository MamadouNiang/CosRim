export class UploadGallery {
  $key: string;
  file: File;
  url; string;
  progress: number;
  createOn: Date = new Date();
  name: string;

  constructor(file: File) {
    this.file = file;
  }
}
