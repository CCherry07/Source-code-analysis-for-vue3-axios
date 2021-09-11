import { inject } from "vue";
import { Request, defaultService } from "./request";
import { CherryConfig } from "./type";
function createService(config: CherryConfig): Request {
  return new Request(config);
}
function useService(instance?: string): Request {
  return inject(instance || defaultService) as Request;
}
export { createService, useService };
