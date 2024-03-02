/* eslint-disable */
// @ts-nocheck
/**
 *
 * This file is generated using:
 * @fluencelabs/aqua-api version: 0.12.0
 * @fluencelabs/aqua-to-js version: 0.1.0
 * If you find any bugs in generated AIR, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * If you find any bugs in generated JS/TS, please write an issue on GitHub: https://github.com/fluencelabs/js-client/issues
 *
 */
import type { IFluenceClient as IFluenceClient$$, CallParams as CallParams$$ } from '@fluencelabs/js-client';

import {
    v5_callFunction as callFunction$$,
    v5_registerService as registerService$$,
} from '@fluencelabs/js-client';

// Services
export interface FaucetDef {
    source: (image: number[], callParams: CallParams$$<'image'>) => number[] | Promise<number[]>;
}
export function registerFaucet(service: FaucetDef): void;
export function registerFaucet(serviceId: string, service: FaucetDef): void;
export function registerFaucet(peer: IFluenceClient$$, service: FaucetDef): void;
export function registerFaucet(peer: IFluenceClient$$, serviceId: string, service: FaucetDef): void;
export function registerFaucet(...args: any[]) {
    registerService$$(
        args,
        {
    "defaultServiceId": "faucet",
    "functions": {
        "fields": {
            "source": {
                "domain": {
                    "fields": {
                        "image": {
                            "type": {
                                "name": "i32",
                                "tag": "scalar"
                            },
                            "tag": "array"
                        }
                    },
                    "tag": "labeledProduct"
                },
                "codomain": {
                    "items": [
                        {
                            "type": {
                                "name": "i32",
                                "tag": "scalar"
                            },
                            "tag": "array"
                        }
                    ],
                    "tag": "unlabeledProduct"
                },
                "tag": "arrow"
            }
        },
        "tag": "labeledProduct"
    }
}
    );
}


// Functions
export const translate_script = `
(xor
 (seq
  (seq
   (seq
    (seq
     (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
     (call %init_peer_id% ("getDataSrv" "peer") [] -peer-arg-)
    )
    (call %init_peer_id% ("getDataSrv" "image") [] -image-arg-)
   )
   (xor
    (seq
     (seq
      (new $-ephemeral-stream-
       (new #-ephemeral-canon-
        (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
       )
      )
      (call -peer-arg- ("faucet" "source") [-image-arg-] ret)
     )
     (new $-ephemeral-stream-
      (new #-ephemeral-canon-
       (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
      )
     )
    )
    (seq
     (seq
      (new $-ephemeral-stream-
       (new #-ephemeral-canon-
        (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
       )
      )
      (new $-ephemeral-stream-
       (new #-ephemeral-canon-
        (canon %init_peer_id% $-ephemeral-stream-  #-ephemeral-canon-)
       )
      )
     )
     (fail :error:)
    )
   )
  )
  (call %init_peer_id% ("callbackSrv" "response") [ret])
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export function translate(
    peer: string,
    image: number[],
    config?: {ttl?: number}
): Promise<number[]>;

export function translate(
    peer: IFluenceClient$$,
    peer: string,
    image: number[],
    config?: {ttl?: number}
): Promise<number[]>;

export function translate(...args: any[]) {
    return callFunction$$(
        args,
        {
    "functionName": "translate",
    "arrow": {
        "domain": {
            "fields": {
                "peer": {
                    "name": "string",
                    "tag": "scalar"
                },
                "image": {
                    "type": {
                        "name": "i32",
                        "tag": "scalar"
                    },
                    "tag": "array"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "type": {
                        "name": "i32",
                        "tag": "scalar"
                    },
                    "tag": "array"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        translate_script
    );
}

export const helloWorld_script = `
(xor
 (seq
  (seq
   (seq
    (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
    (call %init_peer_id% ("getDataSrv" "name") [] -name-arg-)
   )
   (call %init_peer_id% ("op" "concat_strings") ["Hello, " -name-arg-] ret)
  )
  (call %init_peer_id% ("callbackSrv" "response") [ret])
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export function helloWorld(
    name: string,
    config?: {ttl?: number}
): Promise<string>;

export function helloWorld(
    peer: IFluenceClient$$,
    name: string,
    config?: {ttl?: number}
): Promise<string>;

export function helloWorld(...args: any[]) {
    return callFunction$$(
        args,
        {
    "functionName": "helloWorld",
    "arrow": {
        "domain": {
            "fields": {
                "name": {
                    "name": "string",
                    "tag": "scalar"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "name": "string",
                    "tag": "scalar"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        helloWorld_script
    );
}
