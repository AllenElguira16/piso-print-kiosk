import {Controller, Get} from "@tsed/common";

@Controller("/hello-world")
export class KioskController {
  @Get("/")
  get(): string {
    return "hello";
  }
}
