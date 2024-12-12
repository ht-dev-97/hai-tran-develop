interface Life {
  max: number
  min: number
}

interface Weight {
  max: number
  min: number
}

interface Attributes {
  name: string
  description: string
  life: Life
  male_weight: Weight
  female_weight: Weight
  hypoallergenic: boolean
}

interface RelationshipData {
  id: string
  type: string
}

interface Relationships {
  group: {
    data: RelationshipData
  }
}

interface Links {
  self: string
}

export interface BreedData {
  id: string
  type: string
  attributes: Attributes
  relationships: Relationships
  links: Links
}
