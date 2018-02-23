import {  strings } from '@angular-devkit/core';
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
  url,
} from '@angular-devkit/schematics';
import * as stringUtils from '../strings';
import { Schema as ActionOptions } from './schema';

export default function(options: ActionOptions): Rule {

  return (host: Tree, context: SchematicContext) => {

    const sourceDir = options.sourceDir;
    if (!sourceDir) {
      throw new SchematicsException(`sourceDir option is required.`);
    }

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
      ])),
    ]);

    return rule(host, context);

  }
}
