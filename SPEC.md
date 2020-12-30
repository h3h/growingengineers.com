## Concepts

* Person
  - name: string
  - role: Role
  - roleLevel: RoleLevel

* SkillAttribute
  * Enumeration of available skill attributes, categorized by dimension and
    guardrailed by minimum and maximum role level values.
  - dimension
  - levelMinimum
  - levelMaximum

* SkillAttributeScore = enum { Low = 1, Medium, High }

* SkillEvaluation
  * Evaluates a {Person} on a single attribute by asking for a score.

* SkillEvaluator
  * Manager that decides which attributes to offer (via a generator) as a set of
    {SkillEvaluation}s
  - addEvaluation()
  - attributes()
  - scoreAttribute(score: SkillAttributeScore, attr: SkillAttribute): void

* Role
  * Enumeration of available roles for leveling, e.g. Software Engineer,
    Manager, Designer.

* RoleLevel
  * Enumeration of available role levels for a role with methods for interaction
  - ask()

* Importer
  * Takes a CSV with role, level & attribute definitions and imports it for use.


## Flow

```
Home:
  Evaluate
  Research

Evaluate:
  let person = new Person()
  let evaluator = new Evaluator({person: person})
  for (let attr of evaluator.attributes()) {
    let evaluation = new SkillEvaluation(attr)
    evaluation.onscore = score => evaluator.scoreAttribute(score, attr)
    evaluator.addEvaluation(evaluation)
  }
  evaluator.evaluations[0].display()

Research:
  let level = RoleLevel.ask()
  for (let attr of SkillAttribute.all({level: level})) {

  }
```
