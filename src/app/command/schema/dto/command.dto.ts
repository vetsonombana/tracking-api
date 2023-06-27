

export class CreatePackageDto{
    state: boolean
    products: string[]
    estimation: number
}

export class CreateCommandDto{
    packages: CreatePackageDto[]
    from: string
    to: string
}