import { Field, Float, Int, ObjectType, registerEnumType } from "@nestjs/graphql"
import { User } from "src/user/models/user.model";
import { ApartmentType, BusinessPremisesType, Furniture, HouseType, LandType, RealEstateCategory, RealEstateStatus,Direction, LegalDocuments, OwnerType, PostStatus, RealEstateType, StatsTime } from "../../enum/real-estate.enum"

registerEnumType(ApartmentType, {
    name: "ApartmentType"
})

registerEnumType(RealEstateStatus, {
    name: 'RealEstateStatus'
})

registerEnumType(HouseType, {
    name: 'HouseType',
});

registerEnumType(LandType, {
    name: 'LandType',
});

registerEnumType(BusinessPremisesType, {
    name: 'BusinessPremisesType',
});

registerEnumType(Direction, {
    name: 'Direction',
});

registerEnumType(Furniture, {
    name: 'Furniture',
});

registerEnumType(LegalDocuments, {
    name: 'LegalDocuments',
});

registerEnumType(OwnerType, {
    name: 'OwnerType',
});

registerEnumType(RealEstateCategory, {
    name: 'RealEstateCategory',
});

registerEnumType(PostStatus, {
    name: 'PostStatus',
});

registerEnumType(RealEstateType, {
    name: 'RealEstateType'
})

registerEnumType(StatsTime, {
    name: 'StatsTime'
})

@ObjectType()
class Pricing {
    @Field(type => Float)
    total: number

    @Field(type => Float, { nullable: true })
    deposit?: number
}

@ObjectType()
export class Detail {
    @Field(type => Pricing)
    pricing: Pricing
}


@ObjectType()
export class Overview {
    @Field(type => Direction, { nullable: true })
    doorDirection?: Direction

    @Field(type => LegalDocuments, { nullable: true })
    legalDocuments?: LegalDocuments

}

@ObjectType()
export class RealEstateMedia {
    @Field(type => [String])
    images: string[]

    @Field(type => [String])
    videos: string[]
}

@ObjectType()
export class Address {
    @Field(type => String, { nullable: true })
    houseNumber?: string

    @Field(type => Boolean, { defaultValue: false })
    showHouseNumber?: boolean

    @Field(type => String)
    province: string

    @Field(type => String)
    district: string

    @Field(type => String)
    ward: string

    @Field(type => String)
    street: string
}

@ObjectType()
class PositionCode {
    @Field(type => String)
    value: string

    @Field(type => Boolean, { defaultValue: false })
    showCode?: boolean
}

@ObjectType()
export class Position {
    @Field(type => PositionCode, { nullable: true })
    code?: PositionCode
}

@ObjectType()
export class Acreage {
    @Field(type => Float)
    totalAcreage: number
}

@ObjectType()
export class InternalInformation {
    @Field(type => Float, { nullable: true })
    commission: number

    @Field(type => [String], { nullable: true })
    certificateOfLand: string[]
}

@ObjectType()
export class RealEstate {
    @Field(type => String)
    _id?: string

    @Field(type => String)
    title: string

    @Field(type => String)
    description: string

    @Field(type => RealEstateMedia)
    media: RealEstateMedia

    @Field(type => User)
    owner: User

    @Field(type => Date)
    timeStamp: Date

    @Field(type => String)
    directLink: string

    @Field(type => String, { nullable: true })
    googleMapsLink?: string

    @Field(type => String, { nullable: true })
    virtual3DLink?: string 

    @Field(type => Boolean)
    outstanding: boolean

    @Field(type => PostStatus)
    postStatus: PostStatus

    @Field(type => InternalInformation, { nullable: true })
    internalInformation?: InternalInformation

    @Field(type => Int)
    index: number

    @Field({ nullable: true })
    code?: string
}
