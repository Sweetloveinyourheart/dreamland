import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Furniture, HouseType,  RealEstateCategory } from '../enum/real-estate.enum';
import { Acreage, Address, Detail, Overview, Position, RealEstate } from './general';

@ObjectType()
class HouseAddress extends Address {
    @Field(type => String, { nullable: true })
    project?: string
}

@ObjectType()
class HousePosition extends Position {
    @Field(type => String, { nullable: true })
    blockName?: string
}

@ObjectType()
class HouseAcreage extends Acreage {
    @Field(type => Float, { nullable: true })
    usedAcreage?: number

    @Field(type => Float, { nullable: true })
    height?: number

    @Field(type => Float, { nullable: true })
    width?: number
}

@ObjectType()
export class HouseDetail extends Detail {
    @Field(type => HousePosition)
    position: HousePosition

    @Field(type => HouseAddress)
    address: HouseAddress

    @Field(type => HouseAcreage)
    acreage: HouseAcreage
}

@ObjectType()
class HouseOverview extends Overview {
    @Field(type => HouseType)
    type: HouseType

    @Field(type => Int, { nullable: true })
    numberOfFloors?: number

    @Field(type => Int)
    numberOfBedrooms: number

    @Field(type => Int, { nullable: true })
    numberOfBathrooms?: number

    @Field(type => Furniture, { nullable: true })
    furniture?: Furniture

    @Field(type => Boolean, { nullable: true })
    carAlley?: boolean

    @Field(type => Boolean, { nullable: true })
    noHau?: boolean

    @Field(type => Boolean, { nullable: true })
    frontispiece?: boolean
}

@ObjectType()
export class House extends RealEstate {
    @Field(type => RealEstateCategory)
    category: RealEstateCategory

    @Field(type => HouseDetail)
    detail: HouseDetail

    @Field(type => HouseOverview)
    overview: HouseOverview
}