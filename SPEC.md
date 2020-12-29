## Concepts

* Person
  - name
  - roleLevel
* SkillAttribute
  * 
  - dimension
  - levelMinimum
  - levelMaximum
* SkillEvaluation
* SkillEvaluator
  * Manager that decides which attributes to offer (via an iterator) as a set of
    {SkillEvaluation}s
* RoleLevel
  * Enumeration of available role levels with methods for interaction

## Flow

```
Home:
  Evaluate -> Evaluator
  Research -> Researcher

Evaluator:
  let person = new Person()
  let evaluator = new Evaluator({person: person})
  for (let attr of evaluator.attributes()) {
    let evaluation = new SkillEvaluation(attr)
    evaluation.onscore = (score) => { person.scoreSkillAttribute(score) }
    evaluation.display()
  }

Researcher:
  let level = RoleLevel.ask()
  for (let attr of SkillAttribute.all({level: level})) {

  }
```
