import { normalize, strings } from '@angular-devkit/core';
import {
  Rule,
  SchematicsException,
  SchematicContext,
  apply,
  branchAndMerge,
  chain,
  filter,
  mergeWith,
  move,
  noop,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import { Change, InsertChange, NoopChange, RemoveChange } from '@schematics/angular/utility/change';
import { addImportToModule } from '@schematics/angular/utility/ast-utils';
import { findModuleFromOptions } from "@schematics/angular/utility/find-module";
import * as ts from 'typescript';

import * as stringUtils from '../strings';
import { Schema as ActionOptions } from './schema';

export default function(options: ActionOptions): Rule {

  return (host: Tree, context: SchematicContext) => {

    const sourceDir = options.sourceDir;
    if (!sourceDir) {
      throw new SchematicsException(`sourceDir option is required.`);
    }
    if (host.exists('/src/app/store/app-store.module.ts')) {
      throw new Error('/src/app/store/app-store.module.ts file alerady exist ');
    }

    options.path = options.path ? normalize(options.path) : options.path;
    options.module = options.module ||'/src/app/app.module.ts';
    options.module = options.module || findModuleFromOptions(host, options) || '/src/app/app.module.ts';

    const templateSource = apply(url('./files'), [
      options.spec ? noop() : filter(path => !path.endsWith('__spec.ts')),
      template({
        'if-flat': (s: string) =>
          stringUtils.group(
            options.flat ? '' : s,
            options.group ? 'actions' : ''
          ),
        ...({...strings} as object),
        ...strings,
        ...(options as object),
        dot: () => '.',
      }),
      move(sourceDir),
    ]);

    const rule = chain([
      branchAndMerge(chain([
        mergeWith(templateSource),
        addImportsToModule(options)
        // addPackagesJson(option)
      ])),
    ]);

    return rule(host, context);
  }
}

function addImportsToModule(options: ActionOptions): Rule {
  return (host: Tree) => {

    const modulePath = options.module || '';

    if (!host.exists(modulePath)) {
      throw new Error('modulePath file cannot be located: '+ modulePath);
    }

    const sourceText = host.read(modulePath)!.toString('utf-8');
    const source:any = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);

    // Fix: addImportToModule() do not realy working good... it add new import:[] if already have one...
    if (options) {
      insert(host, modulePath, [
        //insertImport(source, modulePath, 'NgRxStoreModule.forRoot({})', './store/app-store.module'),
        ...addImportToModule(source, modulePath,  `NgRxStoreModule.forRoot()`,'./store/app-store.module')
      ]);
      return host;
    }
  };
}

export function insert(host: Tree, modulePath: string, changes: Change[]) {
  const recorder = host.beginUpdate(modulePath);
  for (const change of changes) {
    if (change instanceof InsertChange) {
      recorder.insertLeft(change.pos, change.toAdd);
    } else if (change instanceof RemoveChange) {
      recorder.remove((<any>change).pos - 1, (<any>change).toRemove.length + 1);
    } else if (change instanceof NoopChange) {
      // do nothing
    } else {
      throw new Error(`Unexpected Change '${change}'`);
    }
  }
  host.commitUpdate(recorder);
}
