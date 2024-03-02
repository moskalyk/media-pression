/* eslint-disable */
// @ts-nocheck
/**
 *
 * This file is generated using:
 * @fluencelabs/aqua-api version: 0.13.0
 * @fluencelabs/aqua-to-js version: 0.3.5
 * If you find any bugs in generated AIR, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * If you find any bugs in generated JS/TS, please write an issue on GitHub: https://github.com/fluencelabs/js-client/issues
 *
 */
import type { IFluenceClient as IFluenceClient$$, ParticleContext as ParticleContext$$ } from '@fluencelabs/js-client';

// Making aliases to reduce chance of accidental name collision
import {
    v5_callFunction as callFunction$$,
    v5_registerService as registerService$$
} from '@fluencelabs/js-client';

// Services
export interface FaucetDef {
    source: (image: number[], callParams: ParticleContext$$) => number[] | Promise<number[]>;
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
     (seq
      (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
      (call %init_peer_id% ("getDataSrv" "relay_id") [] -relay_id-arg-)
     )
     (call %init_peer_id% ("getDataSrv" "peer") [] -peer-arg-)
    )
    (call %init_peer_id% ("getDataSrv" "image") [] -image-arg-)
   )
   (xor
    (seq
     (seq
      (seq
       (seq
        (new $-ephemeral-stream-
         (new #-ephemeral-canon-
          (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
         )
        )
        (new $-ephemeral-stream-
         (new #-ephemeral-canon-
          (canon -relay_id-arg- $-ephemeral-stream-  #-ephemeral-canon-)
         )
        )
       )
       (call -peer-arg- ("faucet" "source") [-image-arg-] ret)
      )
      (new $-ephemeral-stream-
       (new #-ephemeral-canon-
        (canon -relay_id-arg- $-ephemeral-stream-  #-ephemeral-canon-)
       )
      )
     )
     (new $-ephemeral-stream-
      (new #-ephemeral-canon-
       (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
      )
     )
    )
    (seq
     (seq
      (seq
       (new $-ephemeral-stream-
        (new #-ephemeral-canon-
         (canon -relay_id-arg- $-ephemeral-stream-  #-ephemeral-canon-)
        )
       )
       (new $-ephemeral-stream-
        (new #-ephemeral-canon-
         (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
        )
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

export type TranslateParams = [relay_id: string, peer: string, image: number[], config?: {ttl?: number}] | [peer: IFluenceClient$$, relay_id: string, peer: string, image: number[], config?: {ttl?: number}];

export type TranslateResult = Promise<number[]>;

export function translate(...args: TranslateParams): TranslateResult {
    return callFunction$$(
        args,
        {
    "functionName": "translate",
    "arrow": {
        "domain": {
            "fields": {
                "relay_id": {
                    "name": "string",
                    "tag": "scalar"
                },
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
    (seq
     (seq
      (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
      (call %init_peer_id% ("getDataSrv" "relay_id") [] -relay_id-arg-)
     )
     (call %init_peer_id% ("getDataSrv" "peer") [] -peer-arg-)
    )
    (call %init_peer_id% ("getDataSrv" "name") [] -name-arg-)
   )
   (xor
    (seq
     (seq
      (seq
       (seq
        (seq
         (new $-ephemeral-stream-
          (new #-ephemeral-canon-
           (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
          )
         )
         (new $-ephemeral-stream-
          (new #-ephemeral-canon-
           (canon -relay_id-arg- $-ephemeral-stream-  #-ephemeral-canon-)
          )
         )
        )
        (new $array-inline
         (seq
          (seq
           (seq
            (ap 1 $array-inline)
            (ap 2 $array-inline)
           )
           (ap 3 $array-inline)
          )
          (canon -peer-arg- $array-inline  #array-inline-0)
         )
        )
       )
       (call -peer-arg- ("faucet" "source") [#array-inline-0] ret)
      )
      (new $-ephemeral-stream-
       (new #-ephemeral-canon-
        (canon -relay_id-arg- $-ephemeral-stream-  #-ephemeral-canon-)
       )
      )
     )
     (new $-ephemeral-stream-
      (new #-ephemeral-canon-
       (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
      )
     )
    )
    (seq
     (seq
      (seq
       (new $-ephemeral-stream-
        (new #-ephemeral-canon-
         (canon -relay_id-arg- $-ephemeral-stream-  #-ephemeral-canon-)
        )
       )
       (new $-ephemeral-stream-
        (new #-ephemeral-canon-
         (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
        )
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

export type HelloWorldParams = [relay_id: string, peer: string, name: string, config?: {ttl?: number}] | [peer: IFluenceClient$$, relay_id: string, peer: string, name: string, config?: {ttl?: number}];

export type HelloWorldResult = Promise<number[]>;

export function helloWorld(...args: HelloWorldParams): HelloWorldResult {
    return callFunction$$(
        args,
        {
    "functionName": "helloWorld",
    "arrow": {
        "domain": {
            "fields": {
                "relay_id": {
                    "name": "string",
                    "tag": "scalar"
                },
                "peer": {
                    "name": "string",
                    "tag": "scalar"
                },
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
        helloWorld_script
    );
}
