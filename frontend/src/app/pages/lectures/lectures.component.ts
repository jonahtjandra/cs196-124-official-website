import { Component, OnInit, NgZone } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import * as data from "../../../assets/lectures.json";

@Component({
  selector: "app-lectures",
  templateUrl: "./lectures.component.html",
  styleUrls: ["./lectures.component.scss"],
})
export class LecturesComponent implements OnInit {
  lectures = data.lectures;
  lecture = data.lectures[0];
  lectureVideo = [{}];

  constructor(private sanitizer: DomSanitizer, private NgZone: NgZone) {}

  ngOnInit() {
    if (data.lectures.length == 0) {
      this.lectureVideo = null;
      return;
    }
    // this.populate(data.lectures[data.lectures.length-1]);
    this.changeLecture(data.lectures.length-1);
  }

  populate(lecture: {
    lectureID?: string;
    title?: string;
    date?: string;
    slides?: string;
    video: any;
  }) {
    if (!lecture.video) {
      this.lectureVideo = null;
      return;
    }
    for (let i = 0; i < lecture.video.length; i++) {
      this.lectureVideo.push({
        title: lecture.video[i].title,
        link: this.sanitizer.bypassSecurityTrustResourceUrl(
          lecture.video[i].link
        ),
        msg: lecture.video[i].msg,
        slides: lecture.video[i].slides
      });
      console.log(this.lectureVideo);
    }
  }

  changeLecture(id: number) {
    this.NgZone.run(() => {
      this.lectureVideo = [{}];
      this.lecture = this.lectures[id];
      this.populate(this.lectures[id]);
    });
  }
}
