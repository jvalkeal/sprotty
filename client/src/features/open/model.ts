/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { SModelElement } from "../../base/model/smodel"

export const openFeature = Symbol('openFeature')

export function isOpenable(element: SModelElement): element is SModelElement  {
    return element.hasFeature(openFeature)
}
