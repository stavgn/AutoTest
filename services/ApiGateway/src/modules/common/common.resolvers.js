import { GraphQLScalarType, Kind } from 'graphql'
const { INT, STRING } = Kind

const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Our custom date scalar',
  parseValue(value) { // How to parse a value from a query variable into the resolver args
    return new Date(value)
  },
  parseLiteral(ast) { // How to parse a value from a hard-coded literal in the query into the resolver args
    switch (ast.kind) {
      case INT: { // Accept millisecond timestamps
        return new Date(parseInt(ast.value))
      }
      case STRING: { // Accept string dates, assuming they're in formats accepted by JS's Date, such as ISO 8601
        return new Date(ast.value)
      }
      default: {
        return null
      }
    }
  },
  serialize(value) {
    return new Date(value).toISOString(); // How to serialize a value before sending to client
  }
})

export default {
  DateTime
}