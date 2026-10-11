import { describe, expect, it } from "vitest";
import type { InitApi } from "@clockwyrks/simple-2d";
import { game } from "./game";
import type { ShatterState } from "./game";

describe("Shatter debug surface", () => {
  it("starts at the title with a ready torpedo", async () => {
    const diagnostics: Array<(state: never) => unknown> = [];
    const api = {
      input: { register: () => undefined, layout: () => null },
      audio: { define: () => undefined, load: async () => undefined },
      assets: {
        loadImage: async () => undefined,
        loadAudio: async () => undefined,
        load: async () => new Blob(),
        resolve: (path: string) => path,
      },
      diagnostics: {
        register: (_name: string, source: (state: never) => unknown) =>
          diagnostics.push(source),
      },
      events: { on: () => () => undefined },
      viewport: () => ({
        width: 1280,
        height: 720,
        scale: 1,
        offsetX: 0,
        offsetY: 0,
      }),
    } as unknown as InitApi<ShatterState>;
    const [state, debug] = await game.initialize(api);
    expect(debug.snapshot(state).screen).toBe("title");
    expect(debug.snapshot(state).torpedoReady).toBe(true);
    expect(diagnostics.length).toBeGreaterThan(5);
  });
});
